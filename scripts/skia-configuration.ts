import { executeCmdSync } from "./utils";

const NdkDir: string = process.env.ANDROID_NDK ?? "";

export const commonArgs = [
  ["skia_use_piex", true],
  ["skia_use_sfntly", false],
  ["skia_use_system_expat", false],
  ["skia_use_system_libjpeg_turbo", false],
  ["skia_use_system_libpng", false],
  ["skia_use_system_libwebp", false],
  ["skia_use_system_zlib", false],
  ["skia_enable_tools", false],
  ["is_official_build", true],
  ["skia_enable_skottie", true],
  ["is_debug", false],
  ["skia_enable_pdf", false],
  ["skia_enable_flutter_defines", true],
  ["paragraph_tests_enabled", false],
  ["is_component_build", false],
  ["skia_enable_paragraph", true],
  ["skia_use_icu", true],
  ["skia_use_system_icu", false],
  ["skia_use_harfbuzz", true],
  ["skia_use_system_harfbuzz", false],
];

export type PlatformName = "ios" | "android";

type Arg = (string | boolean | number)[];
export type Target = {
  args?: Arg[];
  cpu: string;
  output?: string;
  options?: Arg[];
};
export type Configuration = { [K in PlatformName]: Platform };
export type Platform = {
  targets: { [key: string]: Target };
  args: Arg[];
  outputRoot: string;
  outputNames: string[];
  options?: Arg[];
};

export const configurations: Configuration = {
  android: {
    targets: {
      arm: {
        cpu: "arm",
        output: "armeabi-v7a",
      },
      arm64: {
        cpu: "arm64",
        output: "arm64-v8a",
      },
      x86: {
        cpu: "x86",
        output: "x86",
      },
      x64: {
        cpu: "x64",
        output: "x86_64",
      },
    },
    args: [
      ["ndk", `"${NdkDir}"`],
      ["skia_use_system_freetype2", false],
      ["skia_use_gl", true],
      ["cc", '"clang"'],
      ["cxx", '"clang++"'],
      [
        "extra_cflags",
        '["-DSKIA_C_DLL", "-DHAVE_SYSCALL_GETRANDOM", "-DXML_DEV_URANDOM"]',
      ],
    ],
    outputRoot: "package/libs/android",
    outputNames: [
      "libskia.a",
      "libskshaper.a",
      "libsvg.a",
      "libskottie.a",
      "libsksg.a",
      "libskparagraph.a",
      "libskunicode.a",
    ],
  },
  ios: {
    targets: {
      "arm64-iphoneos": {
        cpu: "arm64",
        args: [
          ["ios_min_target", '"13.0"'],
          ["extra_cflags", '["-target", "arm64-apple-ios", "-fembed-bitcode"]'],
          [
            "extra_asmflags",
            '["-target", "arm64-apple-ios", "-fembed-bitcode"]',
          ],
          [
            "extra_ldflags",
            '["-target", "arm64-apple-ios", "-fembed-bitcode"]',
          ],
        ],
      },
      "arm64-iphonesimulator": {
        cpu: "arm64",
        args: [
          ["ios_min_target", '"13.0"'],
          ["extra_cflags", '["-target", "arm64-apple-ios-simulator"]'],
          ["extra_asmflags", '["-target", "arm64-apple-ios-simulator"]'],
          ["extra_ldflags", '["-target", "arm64-apple-ios-simulator"]'],
        ],
      },
      x64: {
        cpu: "x64",
        args: [
          ["ios_min_target", '"13.0"'],
          ["extra_cflags", '["-target", "arm64-apple-ios-simulator"]'],
          ["extra_asmflags", '["-target", "arm64-apple-ios-simulator"]'],
          ["extra_ldflags", '["-target", "arm64-apple-ios-simulator"]'],
        ],
      },
    },
    args: [
      ["skia_use_metal", true],
      ["skia_use_gl", true],
      ["cc", '"clang"'],
      ["cxx", '"clang++"'],
    ],
    outputRoot: "package/libs/ios",
    outputNames: [
      "libskia.a",
      "libskshaper.a",
      "libsvg.a",
      "libskottie.a",
      "libsksg.a",
      "libskparagraph.a",
      "libskunicode.a",
    ],
  },
};
