function Expression(source) {
    if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === 'EOF') {
        let node = {
            type: 'Expression',
            children: [source.shit(), source.shit()]
        }
        source.unshift(node);
        return node;
    }
    AdditiveExpression(source);
    return Expression(source);
}

// 加法
function AdditiveExpression(source) {
    if (source[0].type === 'MultiplicativeExpression') {
        let node = {
            type: 'AdditiveExpression',
            children: [source[0]]
        };
        source[0] = node;
        return AdditiveExpression(source);
    }

    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '+') {
        let node = {
            type: 'AdditiveExpression',
            oparator: '+',
            children: []
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }

    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '-') {
        let node = {
            type: 'AdditiveExpression',
            oparator: '-',
            children: []
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if (source[0].type === 'AdditiveExpression') {
        return source[0];
    }
    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}

// 乘法
function MultiplicativeExpression(source) {
    if (source[0].type === 'Number') {
        let node = {
            type: 'MultiplicativeExpression',
            children: [source[0]]
        };
        source[0] = node;
        return MultiplicativeExpression(source);
    }

    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
        let node = {
            type: 'MultiplicativeExpression',
            oparator: '*',
            children: []
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }

    if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
        let node = {
            type: 'MultiplicativeExpression',
            oparator: '/',
            children: []
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }

    if (source[0].type === 'MultiplicativeExpression') {
        return source[0];
    }
    return MultiplicativeExpression(source);
}

let source = [{
    type: 'Number',
    value: 1024
}, {
    type: '*',
    value: '*'
}, {
    type: 'Number',
    value: '2'
}, {
    type: '+',
    value: '+'
}, {
    type: 'Number',
    value: '2'
}, {
    type: '+',
    value: '+'
}, {
    type: 'Number',
    value: '2'
}, {
    type: 'EOF'
}];

console.log(AdditiveExpression(source));
