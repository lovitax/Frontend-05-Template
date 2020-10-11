// co 框架基本原理
function* loopGenerator() {
    while (true) {
        lightUp('green');
        yield sleep(1000);
        lightUp('yellow');
        yield sleep(200);
        lightUp('red');
        yield sleep(500);
    }
}

function run(iterator) {
    let { value, done } = iterator.next();
    if (done) {
        return;
    }
    if (value instanceof Promise) {
        value.then(() => {
            run(iterator);
        });
    }
}

function co(generator) {
    return function () {
        return run(generator);
    }
}

/** babel */
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}

function loopAsync() {
    return _loopAsync.apply(this, arguments);
}

function _loopAsync() {
    _loopAsync = _asyncToGenerator(function* () {
        while (true) {
            lightUp("green");
            yield sleep(1000);
            lightUp("yellow");
            yield sleep(200);
            lightUp("red");
            yield sleep(500);
        }
    });
    return _loopAsync.apply(this, arguments);
}
