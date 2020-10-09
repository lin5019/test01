window.dom = {
    //增
    create(str) {
        let e = document.createElement('template');
        e.innerHTML = str.trim();
        return e.content.children[0];
    },
    after(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    before(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
    },
    append(newNode, parent) {
        parent.appendChild(newNode);
    },
    wrap(newParent, referenceNode) {
        dom.before(newParent, referenceNode);
        dom.append(referenceNode, newParent);
    },
    //删除
    remove(node) {
        return node.parentNode.removeChild(node);
    },
    empty(node) {
        const result = [];
        let i = node.childNodes[0];
        while (i) {
            result.push(dom.remove(node.childNodes[0]));
            i = node.childNodes[0];
        }
        return result;
    },
    //改
    attr(node, attr, value) {
        if (arguments.length === 2) {
            return node.getAttribute(attr);
        } else if (arguments.length === 3) {
            node.setAttribute(attr, value);
        }
    },
    text(node, str) {
        if (arguments.length === 1) {
            //适配模式
            if ('innerText' in node) {
                return node.innerText;
            } else {
                return node.TextContent;
            }
        } else {
            if ('innerText' in node) {
                node.innerText = str;
            } else {
                node.TextContent = str;
            }
        }
    },
    html(node, str) {
        if (arguments.length === 1) {
            return node.innerHTML;
        } else if (arguments.length === 2) {
            node.innerHTML = str;
        }
    },
    style(node, arg1, arg2) {
        if (arguments.length === 2) {
            if (arg1 instanceof Object) {
                for (const key in arg1) {
                    node.style[key] = arg1[key];
                }
            } else if (typeof arg1 === 'string') {
                return node.style[arg1];
            }
        } else if (arguments.length === 3) {
            node.style[arg1] = arg2;
        }
    },
    class: {
        add(node, str) {
            node.classList.add(str);
        },
        remove(node, str) {
            node.classList.remove(str);
        },
        has(node, str) {
            return node.classList.contains(str);
        },
    },
    on(node, str, fn) {
        node.addEventListener(str, fn);
    },
    off(node, str, fn) {
        node.removeEventListener(str, fn);
    },
    //查
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    children(node) {
        return node.children;
    },
    siblings(node) {
        let arr = node.parentNode.children;
        dom.remove(node);
        return arr;
    },
    next(node) {
        let item = node.nextSibling;
        //在item存在,并且是文本类型进入
        while (item && item.nodeType === 3) {
            item = item.nextSibling;
        }
        return item;
    },
    previous(node) {
        let item = node.previousSibling;
        //在item存在,并且是文本类型进入
        while (item && item.nodeType === 3) {
            item = item.previousSibling;
        }
        return item;
    },
    each(nodeList, fn) {
        for (let index = 0; index < nodeList.length; index++) {
            fn.call(null, nodeList[index]);
        }
    },
    index(node) {
        let index;
        const list = dom.children(node.parentNode);
        for (index = 0; index < list.length; index++) {
            if (list[index] === node) {
                break;
            }
        }
        return index;
    },
};
