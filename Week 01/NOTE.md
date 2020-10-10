学习笔记


## tic-tac-toe 游戏的实现

### 基本思路

1.数据结构：二维数组表示棋盘，棋子通过值表示，0表示未落子，1表示⭕️，2表示❌

2.绘制棋盘，通过数据结构，使用两层for循环绘制即可

3.落子逻辑

4.check逻辑。每个 行/列/斜 与当前user对比，完全一致则胜利。（注意：先落子，再check，再切换用户）



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