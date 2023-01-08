let random = Math.random();

const mbtiType = ['enfj', 'enfp', 'entj', 'entp', 'esfj', 'esfp', 'estj', 'estp',
    'infp', 'infj', 'intp', 'intj', 'isfj', 'isfp', 'istp', 'istj']
perfect = []
bad = []


for (i = 0; i < mbtiType.length; i++) {
    let pMatch = "e";
    let mbti = mbtiType[i]
    let pMBTI = perfectMatch(mbti, pMatch)
    let bMBTI = badMismatch(mbti, pMatch)
    perfect.push(pMBTI)
    bad.push(bMBTI)
    console.log(`{ mbti : "${mbti}", perfect: "${pMBTI}", mismatch: "${bMBTI}" },`)
}

function badMismatch(item, pMatch) {
    if (random * 10 >= 5) pMatch = "i";

    if (item.includes("n") && item.includes("f")) {
        pMatch += "s"

        random = Math.random()
        if (random * 10 <= 5) pMatch += "t"
        else pMatch += "f"

        pMatch += "p"
    } else if ((item.includes("s") && item.includes("p"))) {
        pMatch += "nf"

        random = Math.random()
        if (random * 10 <= 5) pMatch += "p"
        else pMatch += "j"

    } else if ((item.includes("s") && item.includes("j"))) {
        pMatch += "nf"
        random = Math.random()
        if (random * 10 <= 5) pMatch += "p"
        else pMatch += "j"
    } else {
        random = Math.random()
        if (random * 10 >= 5) pMatch += "n"
        else pMatch += "s"

        random = Math.random()
        if (random * 10 <= 5) pMatch += "t"
        else pMatch += "f"

        random = Math.random()
        if (random * 10 <= 5) pMatch += "p"
        else pMatch += "j"
    }


    return pMatch
}

function perfectMatch(item, pMatch) {
    if (random * 10 >= 5) pMatch = "i";

    if (item.includes("n") && item.includes("f")) {
        pMatch += "nt"
        random = Math.random()
        if (random * 10 <= 5) pMatch += "p"
        else pMatch += "j"
    }
    else if ((item.includes("s") && item.includes("j"))) {
        pMatch += "s"

        random = Math.random()
        if (random * 10 <= 5) pMatch += "t"
        else pMatch += "f"

        pMatch += "j"
    }
    else {
        random = Math.random()
        if (random * 10 >= 5) pMatch += "n"
        else pMatch += "s"

        random = Math.random()
        if (random * 10 <= 5) pMatch += "t"
        else pMatch += "f"

        random = Math.random()
        if (random * 10 <= 5) pMatch += "p"
        else pMatch += "j"
    }

    return pMatch
}



console.log(perfect)
console.log(bad)