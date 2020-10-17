学习笔记

### 问题

一开始感觉程序很慢，是因为退出条件写的不对

```js
async function insert(x, y) {
    if (x < 0 || x > 50 || y < 0 || y > 50) {
        return;
    }
    if (mapData[y * 50 + x] === 1) { // 因为后面其实赋值了，是2，只判断1是不行的
        return;
    }
    // await sleep(30);

    // document.getElementById('map').children[y * 50 + x].style.backgroundColor = 'lightgreen';
    mapData[y * 50 + x] = 2;
    queue.push([x, y]);
}
```