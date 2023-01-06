let arr = ['小明', '小红', '大军', '阿黄']

let arr2 = arr.sort()
let last = arr.pop()
let sort = ''

for (let i = 0; i < arr2.length; i++) {
    if (i === arr2.length - 1) {
        sort = sort + arr2[i]
    } else {
        sort = sort + arr2[i] + '，'
    }
}
console.log(`欢迎${sort}和${last}同学`);