/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2018 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import React from "react";
import classNames from "classnames";
import { t } from "@library/application";

const currentColorFill = {
    fill: "currentColor",
};

export function bold() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Bold")}</title>
            <path
                d="M6.511,18v-.62a4.173,4.173,0,0,0,.845-.093.885.885,0,0,0,.736-.79,5.039,5.039,0,0,0,.063-.884V8.452a6.585,6.585,0,0,0-.047-.876,1.116,1.116,0,0,0-.194-.527.726.726,0,0,0-.4-.263,3.658,3.658,0,0,0-.674-.1v-.62h4.975a7.106,7.106,0,0,1,3.6.752A2.369,2.369,0,0,1,16.68,8.964q0,1.843-2.651,2.6v.062a4.672,4.672,0,0,1,1.542.24,3.39,3.39,0,0,1,1.171.674,3.036,3.036,0,0,1,.744,1.023,3.125,3.125,0,0,1,.263,1.287,2.49,2.49,0,0,1-.38,1.379,3.05,3.05,0,0,1-1.092.992,7.794,7.794,0,0,1-3.8.775Zm6.076-.945q2.5,0,2.5-2.248a2.3,2.3,0,0,0-.9-2.015,3.073,3.073,0,0,0-1.2-.465,9.906,9.906,0,0,0-1.806-.139h-.744v3.1a1.664,1.664,0,0,0,.5,1.364A2.659,2.659,0,0,0,12.587,17.055Zm-1.24-5.8a4.892,4.892,0,0,0,1.21-.131,2.69,2.69,0,0,0,.868-.38,1.8,1.8,0,0,0,.743-1.6,2.107,2.107,0,0,0-.557-1.635,2.645,2.645,0,0,0-1.8-.5h-1.1q-.279,0-.279.264v3.983Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function italic() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Italic")}</title>
            <path
                d="M11.472,15.4a4.381,4.381,0,0,0-.186,1.085.744.744,0,0,0,.333.713,2.323,2.323,0,0,0,1.077.186L12.51,18H7.566l.17-.62a3.8,3.8,0,0,0,.791-.07,1.282,1.282,0,0,0,.566-.271,1.62,1.62,0,0,0,.41-.558,5.534,5.534,0,0,0,.326-.93L11.642,8.7a5.332,5.332,0,0,0,.233-1.271.577.577,0,0,0-.349-.612,3.714,3.714,0,0,0-1.186-.132l.171-.62h5.038l-.171.62a3.058,3.058,0,0,0-.852.1,1.246,1.246,0,0,0-.59.38,2.578,2.578,0,0,0-.441.774,11.525,11.525,0,0,0-.4,1.287Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function strike() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Strikethrough")}</title>
            <path
                d="M12.258,13H6V12h4.2l-.05-.03a4.621,4.621,0,0,1-1.038-.805,2.531,2.531,0,0,1-.55-.892A3.285,3.285,0,0,1,8.4,9.2a3.345,3.345,0,0,1,.256-1.318,3.066,3.066,0,0,1,.721-1.046,3.242,3.242,0,0,1,1.1-.682,3.921,3.921,0,0,1,1.4-.24,3.641,3.641,0,0,1,1.271.217,4.371,4.371,0,0,1,1.194.7l.4-.7h.357l.171,3.085h-.574A3.921,3.921,0,0,0,13.611,7.32a2.484,2.484,0,0,0-1.7-.619,2.269,2.269,0,0,0-1.5.465,1.548,1.548,0,0,0-.558,1.255,1.752,1.752,0,0,0,.124.674,1.716,1.716,0,0,0,.4.574,4.034,4.034,0,0,0,.729.542,9.854,9.854,0,0,0,1.116.566,20.49,20.49,0,0,1,1.906.953q.232.135.435.27h4.6v1H15.675a2.263,2.263,0,0,1,.3.544,3.023,3.023,0,0,1,.186,1.093,3.236,3.236,0,0,1-1.177,2.541,4.014,4.014,0,0,1-1.334.721,5.393,5.393,0,0,1-1.7.256,4.773,4.773,0,0,1-1.588-.248,4.885,4.885,0,0,1-1.434-.837l-.434.76H8.132L7.9,14.358h.573a3.886,3.886,0,0,0,.411,1.255A3.215,3.215,0,0,0,10.7,17.155a3.872,3.872,0,0,0,1.294.21,2.786,2.786,0,0,0,1.813-.543,1.8,1.8,0,0,0,.667-1.473,1.752,1.752,0,0,0-.573-1.34,4.04,4.04,0,0,0-.83-.6Q12.723,13.217,12.258,13Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function code() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Paragraph Code Block")}</title>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.11588626,16.5074223 L3.14440918,12.7070466 L3.14440918,11.6376386 L9.11588626,7.32465415 L9.11588626,9.04808032 L4.63575044,12.0883808 L9.11588626,14.7663199 L9.11588626,16.5074223 Z M14.48227,5.53936141 L11.1573124,18.4606386 L9.80043634,18.4606386 L13.131506,5.53936141 L14.48227,5.53936141 Z M15.1729321,14.7663199 L19.6530679,12.0883808 L15.1729321,9.04808032 L15.1729321,7.32465415 L21.1444092,11.6376386 L21.1444092,12.7070466 L15.1729321,16.5074223 L15.1729321,14.7663199 Z"
            />
        </svg>
    );
}

export function link() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Link")}</title>
            <path
                d="M9.108,12.272a.731.731,0,0,0,.909.08l1.078.9a2.094,2.094,0,0,1-2.889.087l-2.4-2.019A2.089,2.089,0,0,1,5.443,8.4L6.892,6.679a2.088,2.088,0,0,1,2.942-.144l2.4,2.019a2.089,2.089,0,0,1,.362,2.924l-.1.114-1.073-.9.1-.114a.705.705,0,0,0-.192-.95l-2.4-2.019a.7.7,0,0,0-.968-.026L6.516,9.3a.7.7,0,0,0,.191.95Zm9.085,1.293a2.088,2.088,0,0,1,.362,2.924l-1.448,1.722a2.088,2.088,0,0,1-2.942.144l-2.4-2.019a2.1,2.1,0,0,1-.409-2.86l1.077.9a.73.73,0,0,0,.235.883l2.4,2.019a.7.7,0,0,0,.968.026l1.448-1.722a.7.7,0,0,0-.192-.95l-2.4-2.019a.7.7,0,0,0-.967-.026l-.1.115-1.072-.9.1-.115a2.087,2.087,0,0,1,2.942-.144ZM10.028,10.6a.466.466,0,0,1,.658-.057l3.664,3.082a.467.467,0,0,1,.057.658l-.308.366a.466.466,0,0,1-.658.057L9.776,11.626a.469.469,0,0,1-.057-.659Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function emoji() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Emoji")}</title>
            <path
                fill="currentColor"
                d="M12,4 C7.58168889,4 4,7.58168889 4,12 C4,16.4181333 7.58168889,20 12,20 C16.4183111,20 20,16.4181333 20,12 C20,7.58168889 16.4183111,4 12,4 Z M12,18.6444444 C8.33631816,18.6444444 5.35555556,15.6636818 5.35555556,12 C5.35555556,8.33631816 8.33631816,5.35555556 12,5.35555556 C15.6636818,5.35555556 18.6444444,8.33631816 18.6444444,12 C18.6444444,15.6636818 15.6636818,18.6444444 12,18.6444444 Z M10.7059556,10.2024889 C10.7059556,9.51253333 10.1466667,8.95324444 9.45671111,8.95324444 C8.76675556,8.95324444 8.20746667,9.51253333 8.20746667,10.2024889 C8.20746667,10.8924444 8.76675556,11.4517333 9.45671111,11.4517333 C10.1466667,11.4517333 10.7059556,10.8924444 10.7059556,10.2024889 Z M14.5432889,8.95306667 C13.8533333,8.95306667 13.2940444,9.51235556 13.2940444,10.2023111 C13.2940444,10.8922667 13.8533333,11.4515556 14.5432889,11.4515556 C15.2332444,11.4515556 15.7925333,10.8922667 15.7925333,10.2023111 C15.7925333,9.51235556 15.2332444,8.95306667 14.5432889,8.95306667 Z M14.7397333,14.1898667 C14.5767111,14.0812444 14.3564444,14.1256889 14.2471111,14.2883556 C14.2165333,14.3336889 13.4823111,15.4012444 11.9998222,15.4012444 C10.5198222,15.4012444 9.7856,14.3374222 9.75271111,14.2885333 C9.64444444,14.1256889 9.42471111,14.0803556 9.2608,14.1884444 C9.09688889,14.2963556 9.05155556,14.5169778 9.15964444,14.6810667 C9.19804444,14.7393778 10.1242667,16.1125333 11.9998222,16.1125333 C13.8752,16.1125333 14.8014222,14.7395556 14.84,14.6810667 C14.9477333,14.5173333 14.9027556,14.2983111 14.7397333,14.1898667 Z"
            />
        </svg>
    );
}

export function embedError() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24" aria-hidden="true">
            <title>{t("Warning")}</title>
            <path
                d="M11.651,3.669,2.068,21.75H21.234Zm.884-1,10,18.865A1,1,0,0,1,21.649,23h-20a1,1,0,0,1-.884-1.468l10-18.865a1,1,0,0,1,1.767,0Zm.232,13.695H10.547L10.2,10h2.905Zm-2.535,2.354a1.239,1.239,0,0,1,.363-.952,1.491,1.491,0,0,1,1.056-.34,1.443,1.443,0,0,1,1.039.34,1.258,1.258,0,0,1,.353.952,1.224,1.224,0,0,1-.367.945A1.452,1.452,0,0,1,11.65,20a1.5,1.5,0,0,1-1.042-.34A1.207,1.207,0,0,1,10.231,18.716Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function pilcrow() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Paragraph")}</title>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M15,6 L17,6 L17,18 L15,18 L15,6 Z M11,6 L13.0338983,6 L13.0338983,18 L11,18 L11,6 Z M11,13.8666667 C8.790861,13.8666667 7,12.1056533 7,9.93333333 C7,7.76101332 8.790861,6 11,6 C11,7.68571429 11,11.6190476 11,13.8666667 Z"
            />
        </svg>
    );
}

export function heading2() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Subtitle")}</title>
            <path
                d="M12.3,17H10.658V12.5H6.051V17H4.417V7.006H6.051v4.088h4.607V7.006H12.3Zm8,0H13.526V15.783L16.1,13.192a22.007,22.007,0,0,0,1.514-1.657,3.978,3.978,0,0,0,.543-.92,2.475,2.475,0,0,0,.171-.923,1.4,1.4,0,0,0-.407-1.066,1.557,1.557,0,0,0-1.124-.39,3,3,0,0,0-1.111.212,5.239,5.239,0,0,0-1.241.766l-.868-1.06a5.612,5.612,0,0,1,1.62-1,4.744,4.744,0,0,1,1.675-.294,3.294,3.294,0,0,1,2.235.728,2.46,2.46,0,0,1,.841,1.959,3.453,3.453,0,0,1-.242,1.285,5.212,5.212,0,0,1-.746,1.254,17.041,17.041,0,0,1-1.671,1.747l-1.736,1.682v.068H20.3Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function heading3() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Sub Subtitle")}</title>
            <path
                d="M10.658,7.006H12.3V17H10.658V12.5H6.051V17H4.417V7.006H6.051v4.088h4.607Zm8.93,5.533a3.016,3.016,0,0,0-1.806-.748v-.055a2.789,2.789,0,0,0,1.56-.851A2.315,2.315,0,0,0,19.9,9.3a2.131,2.131,0,0,0-.848-1.791,3.8,3.8,0,0,0-2.36-.65,5.251,5.251,0,0,0-3.2,1.012l.786,1.121a5.226,5.226,0,0,1,1.245-.625,3.76,3.76,0,0,1,1.1-.161,1.881,1.881,0,0,1,1.232.349,1.22,1.22,0,0,1,.417.991q0,1.654-2.4,1.654H14.99v1.306h.869a4.066,4.066,0,0,1,2,.376,1.267,1.267,0,0,1,.636,1.176,1.559,1.559,0,0,1-.574,1.333,2.89,2.89,0,0,1-1.738.43,5.794,5.794,0,0,1-1.369-.171,6.372,6.372,0,0,1-1.347-.485V16.6a6.532,6.532,0,0,0,2.8.54,4.676,4.676,0,0,0,2.9-.783,2.637,2.637,0,0,0,1.019-2.225A2.143,2.143,0,0,0,19.588,12.539Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function blockquote() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Quote")}</title>
            <path
                d="M10.531,17.286V12.755H8.122a9.954,9.954,0,0,1,.1-1.408,4.22,4.22,0,0,1,.388-1.286,2.62,2.62,0,0,1,.735-.918A1.815,1.815,0,0,1,10.49,8.8V6.755a3.955,3.955,0,0,0-2,.49A4.164,4.164,0,0,0,7.082,8.551a5.84,5.84,0,0,0-.817,1.9A9.65,9.65,0,0,0,6,12.755v4.531Zm7.469,0V12.755H15.592a9.954,9.954,0,0,1,.1-1.408,4.166,4.166,0,0,1,.388-1.286,2.606,2.606,0,0,1,.734-.918A1.819,1.819,0,0,1,17.959,8.8V6.755a3.958,3.958,0,0,0-2,.49,4.174,4.174,0,0,0-1.408,1.306,5.86,5.86,0,0,0-.816,1.9,9.649,9.649,0,0,0-.266,2.306v4.531Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function codeBlock() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Paragraph Code Block")}</title>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M9.11588626,16.5074223 L3.14440918,12.7070466 L3.14440918,11.6376386 L9.11588626,7.32465415 L9.11588626,9.04808032 L4.63575044,12.0883808 L9.11588626,14.7663199 L9.11588626,16.5074223 Z M14.48227,5.53936141 L11.1573124,18.4606386 L9.80043634,18.4606386 L13.131506,5.53936141 L14.48227,5.53936141 Z M15.1729321,14.7663199 L19.6530679,12.0883808 L15.1729321,9.04808032 L15.1729321,7.32465415 L21.1444092,11.6376386 L21.1444092,12.7070466 L15.1729321,16.5074223 L15.1729321,14.7663199 Z"
            />
        </svg>
    );
}

export function spoiler(extraClasses = "") {
    const spoilerClasses = classNames(extraClasses);
    return (
        <svg className={spoilerClasses} viewBox="0 0 24 24">
            <title>{t("Spoiler")}</title>
            <path
                d="M8.138,16.569l.606-.606a6.677,6.677,0,0,0,1.108.562,5.952,5.952,0,0,0,2.674.393,7.935,7.935,0,0,0,1.008-.2,11.556,11.556,0,0,0,5.7-4.641.286.286,0,0,0-.02-.345c-.039-.05-.077-.123-.116-.173a14.572,14.572,0,0,0-2.917-3.035l.6-.6a15.062,15.062,0,0,1,2.857,3.028,1.62,1.62,0,0,0,.154.245,1.518,1.518,0,0,1,.02,1.5,12.245,12.245,0,0,1-6.065,4.911,6.307,6.307,0,0,1-1.106.22,4.518,4.518,0,0,1-.581.025,6.655,6.655,0,0,1-2.383-.466A8.023,8.023,0,0,1,8.138,16.569Zm-.824-.59a14.661,14.661,0,0,1-2.965-3.112,1.424,1.424,0,0,1,0-1.867A13.69,13.69,0,0,1,8.863,6.851a6.31,6.31,0,0,1,6.532.123c.191.112.381.231.568.356l-.621.621c-.092-.058-.184-.114-.277-.168a5.945,5.945,0,0,0-3.081-.909,6.007,6.007,0,0,0-2.868.786,13.127,13.127,0,0,0-4.263,3.929c-.214.271-.214.343,0,.639a13.845,13.845,0,0,0,3.059,3.153ZM13.9,9.4l-.618.618a2.542,2.542,0,0,0-3.475,3.475l-.61.61A3.381,3.381,0,0,1,12,8.822,3.4,3.4,0,0,1,13.9,9.4Zm.74.674a3.3,3.3,0,0,1,.748,2.138,3.382,3.382,0,0,1-5.515,2.629l.6-.6a2.542,2.542,0,0,0,3.559-3.559Zm-3.146,3.146L13.008,11.7a1.129,1.129,0,0,1-1.516,1.516Zm-.6-.811a1.061,1.061,0,0,1-.018-.2A1.129,1.129,0,0,1,12,11.079a1.164,1.164,0,0,1,.2.017Z"
                style={currentColorFill}
            />
            <polygon
                points="19.146 4.146 19.854 4.854 4.854 19.854 4.146 19.146 19.146 4.146"
                style={currentColorFill}
            />
        </svg>
    );
}

export function embed() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Embed")}</title>
            <path
                fill="currentColor"
                d="M4,5a.944.944,0,0,0-1,.875v12.25A.944.944,0,0,0,4,19H20a.944.944,0,0,0,1-.875V5.875A.944.944,0,0,0,20,5ZM4,4H20a1.9,1.9,0,0,1,2,1.778V18.222A1.9,1.9,0,0,1,20,20H4a1.9,1.9,0,0,1-2-1.778V5.778A1.9,1.9,0,0,1,4,4ZM9.981,16.382l-4.264-3.7V11.645L9.981,7.45V9.126l-3.2,2.958,3.2,2.605Zm4.326-1.693,3.2-2.605-3.2-2.958V7.45l4.265,4.195v1.041l-4.265,3.7Z"
                style={currentColorFill}
            />
        </svg>
    );
}

export function image() {
    return (
        <svg className="richEditorButton-icon" viewBox="0 0 24 24">
            <title>{t("Image")}</title>
            <path
                fill="currentColor"
                fillRule="nonzero"
                d="M3,5 L3,19 L21,19 L21,5 L3,5 Z M3,4 L21,4 C21.5522847,4 22,4.44771525 22,5 L22,19 C22,19.5522847 21.5522847,20 21,20 L3,20 C2.44771525,20 2,19.5522847 2,19 L2,5 C2,4.44771525 2.44771525,4 3,4 Z M4,18 L20,18 L20,13.7142857 L15.2272727,7.42857143 L10.5,13.7142857 L7.5,11.5 L4,16.5510204 L4,18 Z M7.41729323,10.2443609 C8.24572036,10.2443609 8.91729323,9.57278803 8.91729323,8.7443609 C8.91729323,7.91593378 8.24572036,7.2443609 7.41729323,7.2443609 C6.58886611,7.2443609 5.91729323,7.91593378 5.91729323,8.7443609 C5.91729323,9.57278803 6.58886611,10.2443609 7.41729323,10.2443609 Z"
            />
        </svg>
    );
}
