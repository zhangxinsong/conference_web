/**
 * 自定义数据结构，用于存储对象结构数据，适用数据结构：{key: value}
 * @author rongqb@yonyou.com
 * @date 20180714
 */
export default function BaseList() {
    this.list = {};
    this.array = [];
    Object.defineProperties(this, {
        length: {
            configurable: false,
            enumerable: false,
            get: () => {
                return this.array && this.array.length || 0;
            }
        },
        // list: {
        //     configurable: false,
        //     enumerable: true,
        //     value: {}
        // },
        // array: {
        //     configurable: false,
        //     enumerable: true,
        //     value: []
        // }
    });
}

BaseList.prototype.set = function(key, val, sortFun) {
    if (key && val) {
        var item = this.get(key),
            index;
        if (item) {
            index = this.array.indexOf(item);
        }

        if (index > -1 && item) {
            this.array.splice(index, 1, val);
        } else {
            this.array.push(val);
        }

        this.list[key] = val;

        if (typeof sortFun == 'function') {
            this.array.sort.call(this.array, sortFun);
        }

        return val;
    }
};

BaseList.prototype.get = function(key) {
    if (key) {
        return this.list[key];
    }
};

BaseList.prototype.getAll = function() {
    return this.array;
};

BaseList.prototype.getMap = function() {
    return this.list;
};

BaseList.prototype.push = function(key, val) {
    if (key && value) {
        this.list[key] = val;
        var result = this.array.push(val);
        return result;
    }
};

BaseList.prototype.pop = function() {
    var result = this.array.pop();
    return result;
};

BaseList.prototype.shift = function() {
    var result = this.array.shift();
    return result;
};

BaseList.prototype.unshift = function(key, val) {
    if (key && value) {
        this.list[key] = val;
        var result = this.array.unshift(val);
        return result;
    }
};

BaseList.prototype.getFirst = function() {
    return this.array.slice(0, 1)[0];
};

BaseList.prototype.getLast = function() {
    return this.array.slice(-1)[0];
};

BaseList.prototype.getPrev = function(key) {
    if (this.get(key)) {
        var index = this.array.indexOf(this.get(key));
        if (index > 0) {
            return this.array[index - 1];
        }
    }
};

BaseList.prototype.getNext = function(key) {
    if (this.get(key)) {
        var index = this.array.indexOf(this.get(key));
        if (index > -1) {
            return this.array[index + 1];
        }
    }
};

BaseList.prototype.remove = function(key) {
    if (key) {
        var item = this.get(key),
            index;
        this.list[key] = null;
        delete this.list[key];
        if (item) {
            index = this.array.indexOf(item);
            if (index > -1) {
                var removed = this.array.splice(index, 1)[0];
                return removed;
            }
        }
        return [];
    }
};

BaseList.prototype.assign = function(key, val) {
    var item = this.get(key);
    if (!item) {
        return this.set.apply(this, arguments);
    } else {
        try {
            return this.set.apply(this, [key, Object.assign(item, val)]);
        } catch (e) {}
    }
};

BaseList.prototype.update = function(key, val) {
    return this.set.apply(this, arguments);
};

BaseList.prototype.clear = function() {
    for (var x in this.list) {
        if (this.list.hasOwnProperty(x)) {
            this.list[x] = null;
            delete this.list[x];
        }
    }
    this.array.splice(0, this.array.length);
};

BaseList.prototype.indexOf = function() {
    return this.array.indexOf.apply(this.array, arguments);
};

BaseList.prototype.includes = function() {
    return this.array.includes.apply(this.array, arguments);
};

BaseList.prototype.lastIndexOf = function() {
    return this.array.lastIndexOf.apply(this.array, arguments);
};

BaseList.prototype.sort = function() {
    return this.array.sort.apply(this.array, arguments);
};

BaseList.prototype.some = function() {
    return this.array.some.apply(this.array, arguments);
};

BaseList.prototype.every = function() {
    return this.array.every.apply(this.array, arguments);
};

BaseList.prototype.map = function() {
    return this.array.map.apply(this.array, arguments);
};

BaseList.prototype.filter = function() {
    return this.array.filter.apply(this.array, arguments);
};

BaseList.prototype.forEach = function() {
    return this.array.forEach.apply(this.array, arguments);
};

BaseList.prototype.keys = function() {
    if (Object.keys) {
        return Object.keys(this.list);
    } else {
        var keys = [];
        for (var x in this.list) {
            if (this.list.hasOwnProperty(x)) {
                keys.push(x);
            }
        }
        return keys;
    }
};