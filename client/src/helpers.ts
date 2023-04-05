import { depMap, posMap } from "./constants";

export function transformFeatureValue(key: string) {
    // first letter uppercase
    key = key[0].toUpperCase() + key.slice(1);
    // special cases
    switch (key) {
        case "Zero":
            key = "0";
            break;
        case "One":
            key = "1";
            break;
        case "Two":
            key = "2";
            break;
        case "Three":
            key = "3";
            break;
        case "Four":
            key = "4";
            break;
        default:
            break;
    }
    return key;
}

export function posToLink(pos: keyof typeof posMap, language: string = "u") {
    return `https://universaldependencies.org/${language}/pos/${pos}.html`;
}

export function morphToLink(feature: string, value: string) {
    if (value) {
        // make sure first letter is uppercase
        value = value[0].toUpperCase() + value.slice(1);
    }
    return `https://universaldependencies.org/u/feat/${feature}.html#${value}`;
}

/**
 * In the absence of better documentation, this links to the Github page for ClearNLP
 * @param dep the full (non-abbreviated) dependency label
 * @returns
 */
export function depToLink(dep: string, language: string) {
    if (language !== "en") {
        return `https://universaldependencies.org/u/dep/${dep.replaceAll(
            ":",
            "-"
        )}.html`;
    }
    const label = depMap[dep]
        .replaceAll(" ", "-")
        .replaceAll("(", "")
        .replaceAll(")", "");

    if (label.startsWith("clausal-modifier")) {
        return "https://www.getcorrecto.com/clearnlp#clausal-modifier";
    }
    if (label === "relative-clause-modifier") {
        return "https://www.getcorrecto.com/clearnlp#releative-clause-modifier";
    }

    return `https://www.getcorrecto.com/clearnlp#${label}`;
}

export function shouldShowLemma(token: any) {
    if (token.lemma === token.text) {
        return false;
    }
    if (token.lemma === "-PRON-") {
        return false;
    }
    return true;
}

export function shouldShowFeatures(token: any) {
    return Boolean(token.morph);
}
