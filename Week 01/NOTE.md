学习笔记


## tic-tac-toe 游戏的实现

### 基本思路

1.数据结构：二维数组表示棋盘，棋子通过值表示，0表示未落子，1表示⭕️，2表示❌

2.绘制棋盘，通过数据结构，使用两层for循环绘制即可

3.落子逻辑

4.check逻辑。每个 行/列/斜 与当前user对比，完全一致则胜利。（注意：先落子，再check，再切换用户）

5.willWin逻辑。遍历每一个没有棋子的点，拷贝一个当前的棋盘，然后在这个新的棋盘上落子，检查落子之后是不是赢了

6.完整ai。winter老师说的是三种策略。赢，和，输。
我想自己换种理解方式，是当前局面的问题；
当前局面要是检查出来一步就赢了，那很简单了，直接走赢棋的那步就行
当前局面没有赢棋的，那我就想一下能不能不输，就走一步，然后换成对手，对手也赢不了
当前局面没有赢棋的，那我就想一下能不能不输，就走一步，然后换成对手，对手赢了，那肯定不行（这种情况其实在上一步也会考虑到，所以不需要单独写逻辑）
走情况最好的那步，然后重复

具体落实到代码上，因为每一步考虑的事情都是一样的，所以需要递归实现

递归逻辑：
    1、走一步就赢了，直接走这步就行了，返回当前胜负情况（1）和坐标
    2、遍历所有能走的点，走一步，然后换对手走
    3、对手能赢，自己就输，所以胜负情况取负数


返回值设计：胜负情况，1，0，-1 ；坐标

### 问题

1.样式问题，有棋子和没有棋子的格子对不齐 (vertical-align: middle;)

2.绘制逻辑，落子的时候会重复画新的棋盘

3.check逻辑，只有在win是true的时候才返回，否则会有问题，第一层循环就只走一次就return了

```js
for (let i = 0; i < 3; i++) {
    let win = true;
    for (let j = 0; j < 3; j++) {
        if(pattern[i][j] !== userFlag) {
            win = false;
        }
    }
    if (win) {
        return true;
    }
}
```

4.willWin逻辑其实就是把每一个可能都check一下，这个时候注意不要破坏目前的棋盘，要深拷贝一个棋盘。注意continue的使用，其实else也行？

5.bestChoice逻辑
递归：
    我一直都觉得递归其实就是数学归纳法的应用，递归在计算机中执行其实就是两步，遇到函数调用就进栈（⤵️），函数执行完就出栈（↑），只不过自己调用自己显得有些神奇。
    所以不需要想象递归树，其实没那么复杂，他是个一维的结构。如果一直是进栈，那肯定就爆了，所以一定要有递归终止。

递归思路：
每个步骤其实都是两种情况，一个是下一步就要赢了，也就是willWin，这个没啥说的。
另一个就是下一步赢不了，但是呢，下一步对手就该走了

对手视角，下一步要赢了，那当前我这个其实就不能走了

局面判定：
这个其实代码很简单，但是我觉得很不好理解。
首先应该是三种局面，-1、0、1，分别是输、和、赢

初始值是-2，就是比差还差，其实没有实际意义，只是为了后续逻辑服务的。

其实这个逻辑有点绕、、、、

### 进阶

1.棋盘数据结构，不使用二维数组，使用一维数组
好处是数据结构简单了，clone的逻辑可以直接使用Object.create()
相关代码变化，只需要把```pattern[i][j]```改成 ```pattern[i*3+j]```

其实这种相当于存储方式变了而已，其他思路没有变。读写都是两层循环，只不过坐标的使用方式变了。

比如如果自己封装一个棋盘，接口其实没有变，还是一个二维的坐标。

考虑一下如果一开始就是设计为一维数组会怎么样
顺着这个思路，坐标是一维的，1~9 读和写也是变成了一层循环
检查胜负就麻烦了，三横三竖两斜，目前我能想到的就是穷举。。。。

## async异步编程 -- traffic-lights

### setTimeout 实现
就很暴力，直接定时器里再开定时器，然后最里层调最外层，这里必然就用递归。但是为啥不会爆栈呢，因为其实宏任务队列会被清的。

### Promise 实现
其实基本和定时器一样的思路，本质都是回调而已，只是Promise是链式调用，然后可以then里返回新的Promise，继续链式调用，最后一层也是递归。
和上面的区别我认为有两点，一个是回调变成了链式调用，一个是使用的是微任务队列。

### async 实现
我理解async实际上就是对Promise的封装，可以用同步的写法处理异步，然后链式调用都可以省了，所以写起来就更简单了


### generator

其实我觉得generator和异步没啥必然关系，只是在没有async/await语法的时候，可以用他来模拟

TODO： 扩展阅读，js高程第四版迭代器和生成器相关部分

### for await