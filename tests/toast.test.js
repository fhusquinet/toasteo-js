import Toast from './../src/js/classes/Toast';

test('a toast can be created', () => {
    let toast = new Toast('My message');
    expect(toast.element).not.toBeNull();
    expect(toast.element.innerHTML).toBe('My message');
});

test('a toast can be created with a class', () => {
    let toast = new Toast('My message', null, 'my-custom-toast-class');
    expect(toast.element).not.toBeNull();
    expect(toast.element.innerHTML).toBe('My message');
    expect(toast.element.className).toBe('my-custom-toast-class');
});

test('a toast can be insered into the DOM', () => {
    let toast = new Toast('My message', null, 'inserted-toast');
    expect(document.querySelector('.inserted-toast')).toBeNull();
    toast.insert(document.body.childNodes[0]);
    expect(document.querySelector('.inserted-toast')).not.toBeNull();
});

test('a toast can be removed', () => {
    let toast = new Toast('My message', null, 'removed-toast');
    toast.insert(document.body.childNodes[0]);
    expect(document.querySelector('.removed-toast')).not.toBeNull();
    toast.remove();
    expect(document.querySelector('.removed-toast')).toBeNull();
    expect(toast.element).toBeNull();
});

test('a toast can be removed after a given duration using a class', () => {
    let toast = new Toast('My message', null, 'removed-toast');
    toast.insert(document.body.childNodes[0]);
    expect(document.querySelector('.removed-toast')).not.toBeNull();
    toast.close('removed-toast--closing', 400);
    expect(toast.element.className).toBe('removed-toast removed-toast--closing');
    setTimeout(() => {
        expect(toast.element).toBeNull();
    }, 400);
});