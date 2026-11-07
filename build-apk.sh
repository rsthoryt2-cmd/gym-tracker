#!/usr/bin/env bash
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOOLS="/home/toheed/.local/android-tools"
PROJECT="/home/toheed/.local/pplul-android"

echo "=== Syncing web assets to APK project ==="
cp "$DIR"/app.js "$DIR"/favicon.png "$DIR"/icon-192.png "$DIR"/icon-512.png "$DIR"/icon.png "$DIR"/index.html "$DIR"/manifest.json "$DIR"/qrcode.min.js "$DIR"/styles.css "$DIR"/sw.js "$PROJECT"/assets/

echo "=== Compiling Android Resources ==="
"$TOOLS"/android-14/aapt2 compile --dir "$PROJECT"/res -o "$PROJECT"/build/res.zip

echo "=== Linking Android Package ==="
"$TOOLS"/android-14/aapt2 link \
  -I "$TOOLS"/android-13/android.jar \
  --manifest "$PROJECT"/AndroidManifest.xml \
  -o "$PROJECT"/build/unaligned.apk \
  --java "$PROJECT"/build/gen \
  -A "$PROJECT"/assets \
  "$PROJECT"/build/res.zip

echo "=== Compiling Java Source ==="
java -jar "$TOOLS"/ecj.jar \
  -7 \
  -cp "$TOOLS"/android-13/android.jar \
  -d "$PROJECT"/build/obj \
  "$PROJECT"/src/com/iron/pplul/MainActivity.java \
  $(find "$PROJECT"/build/gen -name "*.java")

echo "=== Converting to Dalvik DEX ==="
"$TOOLS"/android-14/d8 \
  --lib "$TOOLS"/android-13/android.jar \
  --output "$PROJECT"/build/ \
  $(find "$PROJECT"/build/obj -name "*.class")

echo "=== Packaging DEX into APK ==="
cd "$PROJECT"/build
zip -u unaligned.apk classes.dex

echo "=== Aligning APK ==="
rm -f aligned.apk
"$TOOLS"/android-14/zipalign -v -p 4 unaligned.apk aligned.apk

echo "=== Signing APK ==="
"$TOOLS"/android-14/apksigner sign \
  --ks "$PROJECT"/debug.keystore \
  --ks-key-alias androiddebugkey \
  --ks-pass pass:android \
  --key-pass pass:android \
  --out "$DIR"/pplul-tracker.apk \
  aligned.apk

echo "=== Verifying APK ==="
"$TOOLS"/android-14/apksigner verify "$DIR"/pplul-tracker.apk

echo "=== Build Complete: $DIR/pplul-tracker.apk ==="
