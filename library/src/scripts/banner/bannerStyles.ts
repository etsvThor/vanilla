/**
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { searchBarVariables } from "@library/features/search/SearchBar.variables";
import { buttonGlobalVariables, buttonVariables } from "@library/forms/Button.variables";
import { ButtonPreset } from "@library/forms/ButtonPreset";
import { formElementsVariables } from "@library/forms/formElementStyles";
import { generateButtonStyleProperties } from "@library/forms/styleHelperButtonGenerator";
import { IButton } from "@library/forms/styleHelperButtonInterface";
import { compactSearchVariables } from "@library/headers/mebox/pieces/compactSearchStyles";
import { containerVariables } from "@library/layout/components/containerStyles";
import { panelLayoutVariables } from "@library/layout/PanelLayout.variables";
import { globalVariables } from "@library/styles/globalStyleVars";
import {
    EMPTY_BORDER_RADIUS,
    ensureColorHelper,
    importantUnit,
    standardizeBorderRadius,
    unitIfDefined,
} from "@library/styles/styleHelpers";
import { styleUnit } from "@library/styles/styleUnit";
import { styleFactory, variableFactory } from "@library/styles/styleUtils";
import { useThemeCache } from "@library/styles/themeCache";
import { IThemeVariables } from "@library/theming/themeReducer";
import { calc, important, percent, px, quote, rgba, translateX, translateY, ColorHelper, viewWidth } from "csx";
import { media } from "@library/styles/styleShim";
import { css, CSSObject } from "@emotion/css";
import { titleBarVariables } from "@library/headers/TitleBar.variables";
import { breakpointVariables } from "@library/styles/styleHelpersBreakpoints";
import { t } from "@vanilla/i18n";
import { getMeta } from "@library/utility/appUtils";
import { LayoutTypes } from "@library/layout/types/interface.layoutTypes";
import { IMediaQueryFunction } from "@library/layout/types/interface.panelLayout";
import { Mixins } from "@library/styles/Mixins";
import { Variables } from "@library/styles/Variables";
import { ColorsUtils } from "@library/styles/ColorsUtils";
import { SearchBarPresets } from "./SearchBarPresets";
import { IBorderRadiusOutput } from "@library/styles/cssUtilsTypes";
import { Property } from "csstype";
import { lineHeightAdjustment } from "@library/styles/textUtils";
import { inputVariables } from "@library/forms/inputStyles";

export enum BannerAlignment {
    LEFT = "left",
    CENTER = "center",
}

export type SearchPlacement = "middle" | "bottom";

export interface IBannerOptions {
    enabled: boolean;
    alignment: BannerAlignment;
    mobileAlignment: BannerAlignment;
    hideDescription: boolean;
    hideTitle: boolean;
    hideSearch: boolean;
    hideIcon: boolean;
    searchPlacement: SearchPlacement;
    overlayTitleBar: boolean;
    url: string;
    deduplicateTitles: boolean;
}

/**
 * @varGroup banner
 * @commonTitle Banner
 * @description The banner is a common component made up a background image and various pieces of configurable content.
 * Defaults include a title, description, and a searchbar.
 */
export const bannerVariables = useThemeCache(
    (optionOverrides?: Partial<IBannerOptions>, forcedVars?: IThemeVariables, altName?: string) => {
        const makeThemeVars = variableFactory(altName ?? ["banner", "splash"], forcedVars, undefined, !!altName);
        const globalVars = globalVariables(forcedVars);
        const compactSearchVars = compactSearchVariables(forcedVars);
        const searchBarVars = searchBarVariables(forcedVars);

        // Main colors
        const colors = makeThemeVars("colors", {
            primary: globalVars.mainColors.primary,
            primaryContrast: globalVars.mainColors.primaryContrast,
            secondary: globalVars.mainColors.secondary,
            secondaryContrast: globalVars.mainColors.secondaryContrast,
            bg: globalVars.mainColors.bg,
            fg: globalVars.mainColors.fg,
            borderColor: globalVars.border.color,
        });

        const presets = makeThemeVars("presets", {
            button: {
                /**
                 * @var banner.presets.button.preset
                 * @title Button Preset
                 * @description Choose the type of button to apply to the banner.
                 * @type string
                 * @enum transparent | solid | none
                 */
                preset: ColorsUtils.isLightColor(colors.primaryContrast)
                    ? ButtonPreset.TRANSPARENT
                    : ButtonPreset.SOLID,
            },
            input: {
                /**
                 * @var banner.presets.input.preset
                 * @title Input Preset
                 * @description Choose the type of input to use in the banner.
                 * @type string
                 * @enum transparent | solid | none
                 */
                preset: SearchBarPresets.NO_BORDER,
            },
        });

        if (presets.input.preset === SearchBarPresets.UNIFIED_BORDER) {
            presets.button.preset = ButtonPreset.SOLID; // Unified border currently only supports solid buttons.
        }

        const isSolidButton = presets.button.preset === ButtonPreset.SOLID;
        const isBordered = presets.input.preset === SearchBarPresets.BORDER;
        const isTransparentButton = presets.button.preset === ButtonPreset.TRANSPARENT;
        const isSolidBordered = isBordered && isSolidButton;

        /**
         * @varGroup banner.options
         * @commonTitle Banner - Options
         * @description Control different variants for the banner. These options can affect multiple parts of the banner at once.
         */
        const options = makeThemeVars(
            "options",
            {
                /**
                 * @var banner.options.enabled
                 * @title Enabled
                 * @description When disabled the banner will not appear at all.
                 * @type boolean
                 */
                enabled: true,

                /**
                 * @var banner.options.alignment
                 * @title Alignment
                 * @description Align the banner
                 * @type string
                 * @enum center | left | right
                 */
                alignment: BannerAlignment.CENTER,

                /**
                 * @var banner.options.mobileAlignment
                 * @title Alignment (Mobile)
                 * @description Align the banner on mobile. Defaults to match desktop alignment.
                 * @type string
                 * @enum center | left | right
                 */
                mobileAlignment: BannerAlignment.CENTER,

                /**
                 * @var banner.options.hideDescription
                 * @type boolean
                 */
                hideDescription: false,

                /**
                 * @var banner.options.hideTitle
                 * @type boolean
                 */
                hideTitle: false,

                /**
                 * @var banner.options.hideSearch
                 * @title Hide SearchBar
                 * @type boolean
                 */
                hideSearch: false,

                /**
                 * @var banner.options.hideSearchOnMobile
                 * @title Hide SearchBar on mobile views.
                 * @type boolean
                 */
                hideSearchOnMobile: false,

                /**
                 * @var banner.options.hideIcon
                 * @title Hide Icon
                 * @description Hide icon in banner. Defaults to true.
                 * @type boolean
                 */
                hideIcon: true,

                /**
                 * @var banner.options.searchPlacement
                 * @title SearchBar Placement
                 * @description Place the search bar in different parts of the banner.
                 * @type string
                 * @enum middle | bottom
                 */
                searchPlacement: "middle" as SearchPlacement,
                overlayTitleBar: true,

                /**
                 * @var banner.options.url
                 * @title Title Url
                 * @description When set turn the title into a link to this url.
                 * @type string
                 */
                url: "" as string,

                // Not publicly documented yet. Currently just an escape hatch in case we have issues on deployment.
                deduplicateTitles: true,
            },
            optionOverrides,
        );

        const spacing = makeThemeVars("spacing", {
            /**
             * @varGroup banner.padding
             * @commonTitle Banner Spacing
             * @expand spacing
             */
            padding: Variables.spacing({
                top: globalVars.spacer.pageComponent * 1.5,
                bottom: globalVars.spacer.pageComponent,
                horizontal: globalVars.gutter.half,
            }),
        });

        const dimensions = makeThemeVars("dimensions", {
            /**
             * @var banner.dimensions.minHeight
             * @title Minimum Height
             * @description Apply a minimum height. If the contents of the banner are less than this height,
             * they will be centered within it.
             */
            minHeight: 50,
            maxHeight: undefined,
            mobile: {
                /**
                 * @var banner.dimensions.minHeight
                 * @title Minimum Height (Mobile)
                 * @description Apply a minimum height on smaller device sizes. If the contents of the banner are less than
                 * this height, they will be centered within it.
                 */
                minHeight: undefined as undefined | number | string,
                maxHeight: undefined,
            },
        });

        // INPUT STATE
        const state = makeThemeVars("state", {
            colors: {
                fg: !isBordered ? colors.secondaryContrast : colors.primary,
                bg: !isBordered ? colors.secondary : colors.bg,
            },
            borders: {
                color: colors.bg,
            },
            fonts: {
                color: colors.secondaryContrast,
            },
        });

        const border = makeThemeVars("border", {
            /**
             * @var banner.border.width
             * @title Banner Input - Border Width
             * @description Choose the width of the banner border.
             * @type number|string
             */
            width: searchBarVars.border.width,

            /**
             * @var banner.border.width
             * @title Banner Input - Border Radius
             * @description Choose the radius of the banner border.
             * @type number|string
             */
            radius: searchBarVars.border.radius,
        });

        // Unified border loops around whole search component including search button
        const unifiedBorder = makeThemeVars("unifiedBorder", {
            width: searchBarVars.border.width * 2,
            color: globalVars.mainColors.primary,
        });

        const backgrounds = makeThemeVars("backgrounds", {
            /**
             * @var banner.backgrounds.useOverlay
             * @title Banner - Background Overlay
             * @description Apply an overlay color of the background for improved contrast.
             * This color is detected automatically, but can be overridden with the
             * banner.backgrounds.overlayColor variable.
             * @type boolean
             */

            /**
             * @var banner.backgrounds.overlayColor
             * @title Banner - Background Overlay Color
             * @description Choose a specific overlay color to go with banner.backgrounds.useOverlay.
             * @type string
             * @format hex-color
             */
            ...compactSearchVars.backgrounds,
        });

        const contentContainer = makeThemeVars("contentContainer", {
            minWidth: 550,
            padding: Variables.spacing({
                top: spacing.padding.top,
                bottom: spacing.padding.bottom,
                horizontal: 0,
            }),
            mobile: {
                padding: Variables.spacing({
                    top: globalVars.spacer.componentInner * 2,
                    bottom: globalVars.spacer.componentInner,
                }),
            },
        });

        const rightImage = makeThemeVars("rightImage", {
            image: undefined as string | undefined,
            minWidth: 500,
            disappearingWidth: 500,
            padding: Variables.spacing({
                vertical: globalVars.gutter.size,
                horizontal: containerVariables().spacing.padding * 2,
            }),
        });

        const logo = makeThemeVars("logo", {
            height: "auto" as number | string,
            width: 300 as number | string,
            padding: Variables.spacing({
                all: 12,
            }),
            image: undefined as string | undefined,
            mobile: {
                height: undefined as number | string | undefined,
                width: undefined as number | string | undefined,
            },
        });

        /**
         * @varGroup banner.icon
         * @title Icon
         * @description The icon (of the current category, for example) appearing in the Content banner
         */
        const iconDefaultVars = {
            /**
             * @var banner.icon.width
             * @title Width
             * @description Choose the width of the icon
             * @type number|string
             */
            width: undefined as number | string | undefined,
            /**
             * @var banner.icon.height
             * @title Height
             * @description Choose the height of the icon
             * @type number|string
             */
            height: undefined as number | string | undefined,
            /**
             * @varGroup banner.icon.margins
             * @title Margins
             * @description Set the margins around the icon
             * @expand spacing
             */
            margins: Variables.spacing({}),
            /**
             * @var banner.icon.image
             * @title Image
             * @description The URL where the icon image is hosted
             * @type string
             */
            image: undefined as string | undefined,
            /**
             * @var banner.icon.borderRadius
             * @title Border Radius
             * @description Choose the border radius of the icon
             * @type number|string
             */
            borderRadius: undefined as number | string | undefined,
        };

        const iconInit = makeThemeVars("icon", {
            ...iconDefaultVars,
        });

        const icon = makeThemeVars("icon", {
            ...iconInit,
            /**
             * * @varGroup banner.icon.mobile
             * FIXME: document icon.mobile vargroup whose options are the same as those above
             */
            mobile: {
                ...iconInit,
            },
        });

        const outerBackgroundInit = makeThemeVars(
            "outerBackground",
            /**
             * @varGroup banner.outerBackground
             * @commonTitle Banner - Background
             * @expand background
             */
            Variables.background({
                color: ColorsUtils.modifyColorBasedOnLightness({
                    color: colors.primary,
                    weight: 0.05,
                    inverse: true,
                }),
                repeat: "no-repeat",
                position: "50% 50%",
                size: "cover",
            }),
        );

        const outerBackground = makeThemeVars("outerBackground", {
            ...outerBackgroundInit,
            ...breakpointVariables({
                /**
                 * @varGroup banner.outerBackground.breakpoints.tablet
                 * @title Banner - Background (Tablet)
                 * @expand background
                 */
                tablet: {
                    ...Variables.background({}),
                    breakpointUILabel: t("Tablet"),
                },
                /**
                 * @varGroup banner.outerBackground.breakpoints.mobile
                 * @title Banner - Background (Mobile)
                 * @expand background
                 */
                mobile: {
                    ...Variables.background({}),
                    breakpointUILabel: t("Mobile"),
                },
            }),
        });

        const innerBackground = makeThemeVars(
            "innerBackground",
            Variables.background({
                unsetBackground: true,
                size: "unset",
            }),
        );

        const text = makeThemeVars("text", {
            shadowMix: 1, // We want to get the most extreme lightness contrast with text color (i.e. black or white)
            innerShadowOpacity: 0.25,
            outerShadowOpacity: 0.75,
        });

        const font = makeThemeVars(
            "font",
            /**
             * @varGroup banner.font
             * @title Banner Font
             * @expand font
             */
            Variables.font({
                color: colors.primaryContrast,
                align: options.alignment,
                shadow: `0 1px 1px ${ColorsUtils.colorOut(
                    ensureColorHelper(
                        ColorsUtils.modifyColorBasedOnLightness({
                            color: colors.primaryContrast,
                            weight: text.shadowMix,
                        }),
                    ).fade(text.innerShadowOpacity),
                )}, 0 1px 25px ${ColorsUtils.colorOut(
                    ensureColorHelper(
                        ColorsUtils.modifyColorBasedOnLightness({
                            color: colors.primaryContrast,
                            weight: text.shadowMix,
                        }),
                    ).fade(text.outerShadowOpacity),
                )}`,
            }),
        );

        /**
         * @varGroup banner.textAndSearchContainer
         * @title Banner textAndSearchContainer
         * @description In cases when we want banner text width to be different from the searchbar.
         */
        const textAndSearchContainer = makeThemeVars("textAndSearchContainer", {
            /**
             * @var banner.textAndSearchContainer.maxWidth
             * @title maxWidth
             * @type number|string
             */
            maxWidth: 705 as number | string | undefined,
        });

        /**
         * @varGroup banner.title
         * @title Banner Title
         */
        const title = makeThemeVars("title", {
            /**
             * @var banner.title.maxWidth
             * @type number
             */
            maxWidth: 700,
            /**
             * @varGroup banner.title.font
             * @expand font
             * @title Banner Title - Font
             */
            font: Variables.font({
                ...font,
                ...globalVars.fontSizeAndWeightVars("largeTitle", "semiBold"),
            }),
            /**
             * @varGroup banner.title.fontMobile
             * @expand font
             * @title Banner Title - Font (Mobile)
             */
            fontMobile: Variables.font({
                ...font,
                ...globalVars.fontSizeAndWeightVars("title"),
                weight: font.weight,
            }),
            /**
             * @varGroup banner.title.margins
             * @title Banner Title - Spacing
             * @expand spacing
             */
            margins: Variables.spacing({
                bottom: globalVars.spacer.headingItem,
            }),
            text: getMeta("ui.siteName", t("How can we help you?")),
        });

        /**
         * @varGroup banner.description
         * @title Banner Description
         */
        const description = makeThemeVars("description", {
            text: undefined as string | undefined,
            /**
             * @varGroup banner.description.font
             * @title Banner Title - Font
             * @expand font
             */
            font: Variables.font({
                ...font,
                ...globalVars.fontSizeAndWeightVars("large"),
                weight: font.weight,
            }),
            maxWidth: 400,
            /**
             * @varGroup banner.description.margins
             * @title Banner Description - Spacing
             * @expand spacing
             */
            margins: Variables.spacing({
                bottom: 12,
            }),
        });

        const paragraph = makeThemeVars("paragraph", {
            margin: ".4em",
            text: {
                size: 24,
                weight: 300,
            },
        });

        /**
         * @varGroup banner.searchBar
         * @title Banner - SearchBar
         */
        const searchBarInit = makeThemeVars("searchBar", {
            preset: presets.button.preset,
            input: searchBarVars.input,
            sizing: {
                /**
                 * @var banner.searchBar.sizing.maxWidth
                 * @title Max Width
                 * @description Maximum width for the banner searchbar.
                 */
                maxWidth: textAndSearchContainer.maxWidth,

                /**
                 * @var banner.searchBar.sizing.height
                 * @title Height
                 * @description Height of the banner searchbar.
                 */
                height: Math.max(40, inputVariables().sizing.height),
            },
            border: {
                color: !isBordered ? colors.bg : colors.primary,
                leftColor: isTransparentButton ? colors.primaryContrast : colors.borderColor,
                radius: border.radius,
                width: searchBarVars.border.radius,
            },
        });

        const searchBar = makeThemeVars("searchBar", {
            preset: presets.button.preset,
            border: searchBarInit.border,
            sizing: {
                ...searchBarInit.sizing,
                heightMinusBorder: searchBarInit.sizing.height - searchBarInit.border.width * 2,
            },
            font: Variables.font({
                ...globalVars.fontSizeAndWeightVars("large"),
                weight: font.weight,
                color: searchBarInit.input.fg,
            }),
            margin: Variables.spacing({
                top: 24,
            }),
            marginMobile: Variables.spacing({
                top: 16,
            }),
            shadow: {
                show: false,
                style: `0 1px 1px ${ColorsUtils.colorOut(
                    ensureColorHelper(
                        ColorsUtils.modifyColorBasedOnLightness({
                            color: colors.fg,
                            weight: text.shadowMix,
                            inverse: true,
                        }),
                    ).fade(text.innerShadowOpacity),
                )}, 0 1px 25px ${ColorsUtils.colorOut(
                    ensureColorHelper(
                        ColorsUtils.modifyColorBasedOnLightness({
                            color: colors.fg,
                            weight: text.shadowMix,
                            inverse: true,
                        }),
                    ).fade(text.outerShadowOpacity),
                )}`,
            },

            state: {
                border: {
                    color: isSolidButton ? colors.fg : colors.primaryContrast,
                },
            },
        });

        let buttonStateStyles: IButton["state"] = {
            colors: {
                fg: isSolidBordered ? colors.primary : colors.primaryContrast,
                bg: isSolidBordered
                    ? colors.bg
                    : !ColorsUtils.isLightColor(colors.bg)
                    ? globalVars.elementaryColors.black.fade(0.3)
                    : globalVars.elementaryColors.white.fade(0.3),
            },
            borders: {
                color: isSolidBordered ? colors.primary : isTransparentButton ? colors.primaryContrast : colors.bg,
            },
            fonts: {
                color: isSolidBordered ? colors.primary : colors.primaryContrast,
            },
        };

        const searchButtonBg = isTransparentButton ? rgba(0, 0, 0, 0) : colors.primary;

        let buttonBorderStyles = {
            color: isTransparentButton || isSolidBordered ? globalVars.border.color : searchBarVars.input.bg,
            width: searchBarVars.border.width,
            borderRadius: {
                ...EMPTY_BORDER_RADIUS,
                left: 0,
                right: border.radius,
            } as IBorderRadiusOutput,
            state: {
                borders: buttonStateStyles.borders,
            },
        };

        buttonBorderStyles.borderRadius = standardizeBorderRadius(buttonBorderStyles.borderRadius);

        const searchButtonDropDown = makeThemeVars(
            "searchButton",
            Variables.button({
                name: "searchButton",
                presetName: presets.button.preset,
                sizing: {
                    minHeight: searchBar.sizing.height,
                },
                colors: {
                    bg: isSolidBordered ? colors.bg : searchButtonBg,
                    fg: isSolidBordered ? colors.fg : colors.bg,
                },
                borders: {
                    left: {
                        radius: border.radius,
                        color: colors.bg,
                    },
                    right: {
                        color: searchBar.border.color,
                        width: searchBar.border.width,
                        radius: 0,
                    },
                },
                fonts: {
                    ...globalVars.fontSizeAndWeightVars("large", "bold"),
                },
                state: buttonStateStyles,
            }),
        );

        const buttonColorSolidBordered = colors.fg ?? font.color;
        const searchButtonVars = {
            name: "searchButton",
            presetName: presets.button.preset,
            sizing: {
                minHeight: searchBar.sizing.height,
            },
            colors: {
                bg: isSolidBordered ? colors.bg : searchButtonBg,
                fg: isSolidButton && isBordered ? buttonColorSolidBordered : colors.bg,
            },
            borders: buttonBorderStyles,
            fonts: {
                ...globalVars.fontSizeAndWeightVars("large", "bold"),
            },
            state: buttonStateStyles,
        };

        const searchButton = makeThemeVars("searchButton", Variables.button(searchButtonVars));

        if (isSolidButton && !isBordered) {
            const buttonVars = buttonVariables();
            searchButton.state = {
                ...searchButton.state,
                ...buttonVars.primary.state,
            };
            searchButton.colors = buttonVars.primary!.colors;
            searchButton.borders!.color = buttonVars.primary.borders!.color;

            searchButtonDropDown.state = buttonVars.primary.state;
            searchButtonDropDown.colors = buttonVars.primary.colors;
            searchButtonDropDown.borders!.color = buttonVars.primary.borders!.color;
        }

        const buttonShadow = makeThemeVars("shadow", {
            color: ensureColorHelper(
                ColorsUtils.modifyColorBasedOnLightness({ color: colors.primaryContrast, weight: text.shadowMix }),
            ).fade(0.05),
            full: `0 1px 15px ${ColorsUtils.colorOut(
                ensureColorHelper(
                    ColorsUtils.modifyColorBasedOnLightness({ color: colors.primaryContrast, weight: text.shadowMix }),
                ).fade(0.3),
            )}`,
            background: ensureColorHelper(
                ColorsUtils.modifyColorBasedOnLightness({
                    color: colors.primaryContrast,
                    weight: text.shadowMix,
                }),
            )
                .fade(0.1)
                .toString(),
        });

        /**
         * @varGroup banner.searchStrip
         * @title Banner - Search Strip
         */
        const searchStrip = makeThemeVars("searchStrip", {
            /**
             * @var banner.searchStrip.bg
             * @title Background
             * @description Background for the search strip that appears with banner.options.searchPlacement = "bottom".
             * @type string
             * @format hex-color
             */
            bg: globalVars.mainColors.primary as ColorHelper | undefined | string,

            /**
             * @var banner.searchStrip.minHeight
             * @title Minimum Height
             * @description Minimum height for the search strip that appears with banner.options.searchPlacement = "bottom".
             */
            minHeight: 60 as number | string,
            offset: undefined as number | string | undefined,
            padding: Variables.spacing({
                top: 12,
                bottom: 12,
            }),
            mobile: {
                bg: undefined as Property.BackgroundColor | undefined,
                minHeight: undefined as "string" | number | undefined,
                offset: undefined as "string" | number | undefined,
                padding: Variables.spacing({
                    bottom: undefined, // FIXME: this is just here so that overrides from storybook work
                }),
            },
        });

        return {
            font,
            presets,
            options,
            outerBackground,
            backgrounds,
            spacing,
            innerBackground,
            contentContainer,
            dimensions,
            unifiedBorder,
            text,
            title,
            description,
            paragraph,
            state,
            searchBar,
            buttonShadow,
            searchButton,
            colors,
            rightImage,
            border,
            isTransparentButton,
            searchStrip,
            logo,
            icon,
            searchButtonDropDown,
            searchButtonBg,
            textAndSearchContainer,
        };
    },
);

export const bannerClasses = useThemeCache(
    (
        mediaQueries: IMediaQueryFunction,
        alternativeVariables?: ReturnType<typeof bannerVariables>,
        altName?: string,
        options?: { debug?: boolean | string },
    ) => {
        const bannerVars = bannerVariables();
        const vars = alternativeVariables ?? bannerVars;
        const formElementVars = formElementsVariables();
        const globalVars = globalVariables();
        const { searchBar } = vars;
        const isCentered = vars.options.alignment === "center";
        const borderRadius =
            vars.searchBar.border.radius !== undefined ? vars.searchBar.border.radius : vars.border.radius;
        const isUnifiedBorder = vars.presets.input.preset === SearchBarPresets.UNIFIED_BORDER;
        const isBordered = vars.presets.input.preset === SearchBarPresets.BORDER;
        const isSolidBordered = isBordered && vars.presets.button.preset === ButtonPreset.SOLID;

        const searchButton = css({
            height: styleUnit(vars.searchBar.sizing.height),
            ...{
                "&.searchBar-submitButton": {
                    ...generateButtonStyleProperties({
                        buttonTypeVars: vars.searchButton,
                        debug: true,
                    }),
                    ...{
                        "&&&&": {
                            borderTopLeftRadius: importantUnit(0),
                            borderBottomLeftRadius: importantUnit(0),
                        },
                        "&&&:hover,&&&:focus, &&&.focus-visible, &&&:active": {
                            backgroundColor: isSolidBordered
                                ? ColorsUtils.colorOut(vars.colors.bg)
                                : ColorsUtils.colorOut(
                                      !ColorsUtils.isLightColor(vars.searchButtonBg)
                                          ? globalVars.elementaryColors.black.fade(0.3)
                                          : globalVars.elementaryColors.white.fade(0.3),
                                  ),
                            borderColor: isSolidBordered ? ColorsUtils.colorOut(vars.colors.primary) : undefined,
                            color: isSolidBordered
                                ? ColorsUtils.colorOut(vars.colors.primary)
                                : ColorsUtils.colorOut(vars.searchButton!.colors!.fg),
                        },
                    },
                },
            },
        });

        const searchDropDownButton = css({
            ...Mixins.button(vars.searchButtonDropDown),
        });

        const valueContainer = css({});

        const outerBackground = useThemeCache((url?: string) => {
            const finalUrl = url ?? vars.outerBackground.image ?? undefined;
            const finalTabletUrl = url ?? vars.outerBackground.breakpoints.tablet.image;
            const finalMobileUrl = url ?? vars.outerBackground.breakpoints.mobile.image;
            const finalVars = {
                ...vars.outerBackground,
                image: finalUrl,
            };

            return css({
                position: "absolute",
                top: 0,
                left: 0,
                width: percent(100),
                height: calc(`100% + 2px`),
                transform: translateY(`-1px`), // Depending on how the browser rounds the pixels, there is sometimes a 1px gap above the banner
                display: "block",
                ...Mixins.background(finalVars),
                ...(finalTabletUrl
                    ? mediaQueries({
                          [LayoutTypes.THREE_COLUMNS]: {
                              twoColumnsDown: Mixins.background({ ...vars.outerBackground, image: finalTabletUrl }),
                          },
                      })
                    : {}),
                ...(finalMobileUrl
                    ? mediaQueries({
                          [LayoutTypes.THREE_COLUMNS]: {
                              twoColumnsDown: Mixins.background({ ...vars.outerBackground, image: finalMobileUrl }),
                          },
                      })
                    : {}),
            });
        });

        const defaultBannerSVG = css({
            ...Mixins.absolute.fullSizeOfParent(),
        });

        const backgroundOverlay = css({
            display: "block",
            position: "absolute",
            top: px(0),
            left: px(0),
            width: percent(100),
            height: calc(`100% + 2px`),
            background: ColorsUtils.colorOut(vars.backgrounds.overlayColor),
        });

        const contentContainer = (hasFullWidth = false) => {
            return css(
                {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: vars.options.alignment === BannerAlignment.LEFT ? "flex-start" : "center",
                    ...Mixins.padding(vars.contentContainer.padding),
                    ...Mixins.background(vars.innerBackground),
                    minWidth: styleUnit(vars.contentContainer.minWidth),
                    maxWidth: vars.rightImage.image ? styleUnit(vars.contentContainer.minWidth) : undefined,
                    minHeight: styleUnit(vars.dimensions.minHeight),
                    maxHeight: unitIfDefined(vars.dimensions.maxHeight),
                    flexGrow: 0,
                    width: hasFullWidth || vars.options.alignment === BannerAlignment.LEFT ? percent(100) : undefined,
                },
                media(
                    {
                        maxWidth: vars.contentContainer.minWidth + containerVariables().spacing.padding * 2 * 2,
                    },
                    {
                        right: "initial",
                        left: 0,
                        minWidth: percent(100),
                        maxWidth: percent(100),
                        minHeight: unitIfDefined(vars.dimensions.mobile.minHeight),
                        maxHeight: unitIfDefined(vars.dimensions.mobile.maxHeight ?? vars.dimensions.maxHeight),
                        ...(vars.options.mobileAlignment
                            ? {
                                  alignItems:
                                      vars.options.mobileAlignment === BannerAlignment.LEFT ? "flex-start" : "center",
                              }
                            : {}),
                        ...Mixins.padding(vars.contentContainer.mobile.padding),
                    },
                ),
            );
        };

        const text = css({
            color: ColorsUtils.colorOut(vars.colors.primaryContrast),
        });

        const noTopMargin = css({});

        const conditionalUnifiedBorder = isUnifiedBorder
            ? {
                  borderRadius,
                  boxShadow: `0 0 0 ${styleUnit(bannerVars.unifiedBorder.width)} ${ColorsUtils.colorOut(
                      bannerVars.unifiedBorder.color,
                  )}`,
              }
            : {};

        const searchContainer = css({
            position: "relative",
            width: percent(100),
            maxWidth: styleUnit(searchBar.sizing.maxWidth),
            height: styleUnit(vars.searchBar.sizing.height),
            margin: isCentered ? "auto" : undefined,
            ...Mixins.margin(vars.searchBar.margin),
            ...conditionalUnifiedBorder,
            ...{
                ".search-results": {
                    width: percent(100),
                    maxWidth: styleUnit(vars.searchBar.sizing.maxWidth),
                    margin: "auto",
                    zIndex: 2,
                },
                [`&.${noTopMargin}`]: {
                    marginTop: 0,
                },
                ...mediaQueries({
                    [LayoutTypes.THREE_COLUMNS]: {
                        oneColumnDown: {
                            ...Mixins.margin(vars.searchBar.marginMobile),
                            [noTopMargin]: {
                                marginTop: 0,
                            },
                        },
                    },
                }),
            },
        });

        const iconContainer = css({
            ...lineHeightAdjustment(),
            ...Mixins.margin(vars.icon.margins),
        });

        const icon = css({
            width: styleUnit(vars.icon.width),
            maxWidth: styleUnit(vars.icon.width),
            height: styleUnit(vars.icon.height),
            maxHeight: styleUnit(vars.icon.height),
            borderRadius: vars.icon.borderRadius,

            ...mediaQueries({
                [LayoutTypes.THREE_COLUMNS]: {
                    oneColumnDown: {
                        width: styleUnit(vars.icon.mobile.width),
                        maxWidth: styleUnit(vars.icon.mobile.width),
                        height: styleUnit(vars.icon.mobile.height),
                        maxHeight: styleUnit(vars.icon.mobile.height),
                        borderRadius: vars.icon.mobile.borderRadius,
                    },
                },
            }),
        });

        const input = css({});

        const buttonLoader = css({});

        const title = css({
            "&&&": {
                display: "block",
                ...Mixins.font(vars.title.font),
                flexGrow: 1,
                ...mediaQueries({
                    [LayoutTypes.THREE_COLUMNS]: {
                        oneColumnDown: {
                            ...Mixins.font(vars.title.fontMobile),
                        },
                    },
                }),
            },
        });

        const titleAction = css({});

        const iconTextAndSearchContainer = css({
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: percent(100),
        });

        const textAndSearchContainer = css({
            display: "flex",
            flexDirection: "column",
            width: percent(100),
            flexBasis: styleUnit(vars.textAndSearchContainer.maxWidth),
            flexGrow: 0,
            marginLeft: isCentered ? "auto" : undefined,
            marginRight: isCentered ? "auto" : undefined,
        });

        const titleWrap = css({
            ...Mixins.margin(vars.title.margins),
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
        });

        const titleUrlWrap = css({
            marginLeft: isCentered ? "auto" : undefined,
            marginRight: isCentered ? "auto" : undefined,
        });

        const titleFlexSpacer = css({
            display: isCentered ? "block" : "none",
            position: "relative",
            height: styleUnit(formElementVars.sizing.height),
            width: styleUnit(formElementVars.sizing.height),
            flexBasis: styleUnit(formElementVars.sizing.height),
            transform: translateX(px((formElementVars.sizing.height - globalVars.icon.sizes.default) / 2 - 1)), // The "3" is to offset the pencil that visually doesn't look aligned without a cheat.
            ...{
                ".searchBar-actionButton:after": {
                    content: quote(""),
                    ...Mixins.absolute.middleOfParent(),
                    width: px(20),
                    height: px(20),
                    backgroundColor: ColorsUtils.colorOut(vars.buttonShadow.background),
                    boxShadow: vars.buttonShadow.full,
                },
                ".searchBar-actionButton": {
                    color: important("inherit"),
                    "&:not(.focus-visible)": {
                        outline: 0,
                    },
                },
                ".icon-compose": {
                    zIndex: 1,
                },
            },
        });

        const descriptionWrap = css({
            ...Mixins.margin(vars.description.margins),
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
        });

        const description = css({
            display: "block",
            ...Mixins.font(vars.description.font),
            flexGrow: 1,
        });

        const content = css({
            boxSizing: "border-box",
            flexGrow: 1,
            zIndex: 1,
            boxShadow: vars.searchBar.shadow.show ? vars.searchBar.shadow.style : undefined,
            minHeight: styleUnit(vars.searchBar.sizing.height),
        });

        const imagePositioner = css({
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            maxWidth: percent(100),
            height: percent(100),
        });

        const makeImageMinWidth = (rootUnit, padding) => {
            const negative =
                vars.contentContainer.minWidth + (vars.contentContainer.padding.horizontal as number) + padding;

            return calc(`${styleUnit(rootUnit)} - ${styleUnit(negative)}`);
        };

        // const innerBreak = vars.contentContainer.minWidth + vars.contentContainer.padding.horizontal + ;
        const imageElementContainer = css(
            {
                alignSelf: "stretch",
                maxWidth: makeImageMinWidth(
                    panelLayoutVariables().contentWidth,
                    containerVariables().spacing.padding * 2 * 2,
                ),
                flexGrow: 1,
                position: "relative",
                overflow: "hidden",
            },
            media(
                { maxWidth: panelLayoutVariables().contentWidth },
                {
                    minWidth: makeImageMinWidth("100vw", containerVariables().spacing.padding * 2),
                },
            ),
            panelLayoutVariables()
                .mediaQueries()
                .oneColumnDown({
                    minWidth: makeImageMinWidth("100vw", containerVariables().spacing.mobile.padding * 2),
                }),
            media(
                { maxWidth: 500 },
                {
                    display: "none",
                },
            ),
        );

        const logoContainer = css({
            display: "flex",
            width: percent(100),
            height: styleUnit(vars.logo.height),
            maxWidth: percent(100),
            minHeight: styleUnit(vars.logo.height),
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            ...mediaQueries({
                [LayoutTypes.THREE_COLUMNS]: {
                    oneColumnDown: {
                        height: unitIfDefined(vars.logo.mobile.height),
                        minHeight: unitIfDefined(vars.logo.mobile.height),
                    },
                },
            }),
        });

        const logoSpacer = css({
            ...Mixins.padding(vars.logo.padding),
        });

        const logo = css({
            height: styleUnit(vars.logo.height),
            width: styleUnit(vars.logo.width),
            maxHeight: percent(100),
            maxWidth: percent(100),
            ...mediaQueries({
                [LayoutTypes.THREE_COLUMNS]: {
                    oneColumnDown: {
                        height: unitIfDefined(vars.logo.mobile.height),
                        width: unitIfDefined(vars.logo.mobile.width),
                    },
                },
            }),
        });

        const rightImage = css(
            {
                ...Mixins.absolute.fullSizeOfParent(),
                minWidth: styleUnit(vars.rightImage.minWidth),
                objectPosition: "100% 50%",
                objectFit: "contain",
                marginLeft: "auto",
                ...Mixins.padding(vars.rightImage.padding),
            },
            media(
                { maxWidth: vars.contentContainer.minWidth + vars.rightImage.minWidth },
                {
                    paddingRight: 0,
                },
            ),
        );

        const titleBarVars = titleBarVariables();

        // NOTE FOR FUTURE
        // Do no apply overflow hidden here.
        // It will cut off the search box in the banner.
        const root = css(
            {
                position: "relative",
                zIndex: 1, // To make sure it sites on top of panel layout overflow indicators.
                maxWidth: percent(100),
                backgroundColor: ColorsUtils.colorOut(vars.outerBackground.color),
                ".searchBar": {
                    height: styleUnit(vars.searchBar.sizing.height),
                },
            },
            titleBarVars.swoop.amount > 0
                ? {
                      marginTop: -titleBarVars.swoop.swoopOffset,
                      paddingTop: titleBarVars.swoop.swoopOffset,
                  }
                : {},
        );

        const bannerContainer = css({
            position: "relative",
        });

        // Use this for cutting of the right image with overflow hidden.
        const overflowRightImageContainer = css({
            ...Mixins.absolute.fullSizeOfParent(),
            overflow: "hidden",
        });

        const fullHeight = css({
            height: percent(100),
        });

        const resultsAsModal = css({
            "&&": {
                top: styleUnit(vars.searchBar.sizing.height + 2),
                ...panelLayoutVariables()
                    .mediaQueries()
                    .xs({
                        width: viewWidth(100),
                        left: `50%`,
                        transform: translateX("-50%"),
                        borderTopRightRadius: 0,
                        borderTopLeftRadius: 0,
                        ".suggestedTextInput-option": {
                            ...Mixins.padding({
                                horizontal: 21,
                            }),
                        },
                    }),
            },
        });

        const middleContainer = css({
            height: percent(100),
            position: "relative",
            minHeight: styleUnit(vars.dimensions.minHeight),
            ...mediaQueries({
                [LayoutTypes.THREE_COLUMNS]: {
                    oneColumnDown: {
                        minHeight: unitIfDefined(vars.dimensions.mobile.minHeight),
                    },
                },
            }),
        });

        const searchStrip = css({
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            background: ColorsUtils.colorOut(vars.searchStrip.bg),
            ...Mixins.padding(vars.searchStrip.padding),
            minHeight: unitIfDefined(vars.searchStrip.minHeight),
            marginTop: unitIfDefined(vars.searchStrip.offset),
            ...mediaQueries({
                [LayoutTypes.THREE_COLUMNS]: {
                    oneColumnDown: {
                        background: vars.searchStrip.mobile.bg
                            ? ColorsUtils.colorOut(vars.searchStrip.mobile.bg)
                            : undefined,
                        ...Mixins.padding(vars.searchStrip.mobile.padding),
                        minHeight: unitIfDefined(vars.searchStrip.mobile.minHeight),
                        marginTop: unitIfDefined(vars.searchStrip.mobile.offset),
                    },
                },
            }),
        });

        return {
            root,
            bannerContainer,
            overflowRightImageContainer,
            fullHeight,
            outerBackground,
            contentContainer,
            valueContainer,
            text,
            defaultBannerSVG,
            searchContainer,
            searchButton,
            input,
            buttonLoader,
            iconTextAndSearchContainer,
            textAndSearchContainer,
            title,
            titleAction,
            titleFlexSpacer,
            titleWrap,
            titleUrlWrap,
            description,
            descriptionWrap,
            content,
            iconContainer,
            icon,
            resultsAsModal,
            backgroundOverlay,
            imageElementContainer,
            rightImage,
            middleContainer,
            imagePositioner,
            searchStrip,
            noTopMargin,
            logoContainer,
            logoSpacer,
            logo,
            searchDropDownButton,
        };
    },
);
