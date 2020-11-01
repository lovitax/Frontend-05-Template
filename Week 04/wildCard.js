const find = (source, pattern) => {
    // 计算出*号的个数 
    let starCount = 0
    for (let i = 0; i < pattern.length; i++)
        if (pattern[i] === '*')
            starCount++
    // 如果没有*号，则严格匹配
    if (starCount === 0) {
        for (i = 0; i < pattern.length; i++)
            if (pattern[i] !== source[i] && pattern[i] !== '?')
                return false
    }

    // 分段处理
    let i = 0 // pattern的位置
    let lastIndex = 0 //source的位置
    for (i = 0; pattern[i] != '*'; i++) {
        if (pattern[i] !== source[i] && pattern[i] !== '?') {
            return false
        }
    }
    lastIndex = i

    for (p = 0; p < starCount - 1; p++) {
        let subPattern = ''
        i++
        while (pattern[i] !== '*') {
            subPattern += pattern[i]
            i++
        }

        let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g')
        reg.lastIndex = lastIndex
        let ret = reg.exec(source)
        console.log(ret, reg)
        if (!ret) {
            return false
        }
        lastIndex = reg.lastIndex
    }

    for (i = 0; i < pattern.length - lastIndex && pattern[pattern.length - 1] !== '*'; i++) {
        if (pattern[pattern.length - i] !== source[source.length - i] && pattern[pattern.length - i] !== '?') {
            return false
        }
    }
    return true
}