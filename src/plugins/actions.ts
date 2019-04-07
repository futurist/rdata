
interface PlainObject {
    [key: string]: any
}

type RootType = PlainObject;

export namespace A.B {
    var x = 0;
    console.log(x);
}

export default function (root: RootType, util: PlainObject) {
    function dispatch(this: any, action: PlainObject) {
        // action: {path: 'a.b', type: 'add', value: 'value'}
        const { path, type, value } = action
        const { skip } = root.observer
        root.observer.skip = true
        switch(type) {
            case 'add':
            case 'change':
                root.set(path, value)
                break
            case 'delete':
                root.unset(path)
                break
        }
        root.observer.skip = skip
    }
    root.dispatch = dispatch
}

