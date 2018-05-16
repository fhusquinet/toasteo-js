import Toasteo from './../src/js/classes/Toasteo';

// Reset the DOM before each test
beforeEach(() => {
    document.documentElement.innerHTML = '<head></head><body></body>';
});

test('it can create the toast container with the default class name', () => {
    let toasteo = new Toasteo();
    expect(document.querySelector('.' + toasteo.options.classes.container)).toBeNull();

    toasteo.createContainer();
    expect(document.querySelector('.' + toasteo.options.classes.container)).not.toBeNull();
});

test('it can create the toast container with a custom class set on initialization', () => {
    let toasteo = new Toasteo({classes: {container: 'my-custom-class'}});
    expect(document.querySelector('.my-custom-class')).toBeNull();

    toasteo.createContainer();
    expect(document.querySelector('.my-custom-class')).not.toBeNull();
});

test('the container will only be created if it does not exist yet', () => {
    let toasteo = new Toasteo();

    toasteo.createContainer();
    expect(document.querySelectorAll('.' + toasteo.options.classes.container).length).toBe(1);
    toasteo.createContainer();
    expect(document.querySelectorAll('.' + toasteo.options.classes.container).length).toBe(1);
});

test('it can create a toast and its container', () => {
    let toasteo = new Toasteo();
    toasteo.create('My message');
    expect(document.querySelector('.toast-container')).not.toBeNull();
    expect(document.querySelector('.toast')).not.toBeNull();
});

test('it can create two toasts and which will keep one container', () => {
    let toasteo = new Toasteo();
    toasteo.create('My first message');
    toasteo.create('My second message');
    expect(document.querySelectorAll('.toast-container').length).toBe(1);
    expect(document.querySelectorAll('.toast').length).toBe(2);
});

test('it can create a toast with a custom class', () => {
    let toasteo = new Toasteo({classes: {default: 'toasteo'}});
    toasteo.create('My toasteo message');
    expect(document.querySelector('.toasteo')).not.toBeNull();
});

test('it can create a success toast', () => {
    let toasteo = new Toasteo();
    toasteo.success('My success message');
    expect(document.querySelector('.toast.toast--success')).not.toBeNull();
});

test('it can create a success toast with a custom class', () => {
    let toasteo = new Toasteo({classes: {success: 'custom-success-class'}});
    toasteo.success('My success message');
    expect(document.querySelector('.toast.custom-success-class')).not.toBeNull();
});

test('it can create a warning toast', () => {
    let toasteo = new Toasteo();
    toasteo.warning('My warning message');
    expect(document.querySelector('.toast.toast--warning')).not.toBeNull();
});

test('it can create a warning toast with a custom class', () => {
    let toasteo = new Toasteo({classes: {warning: 'custom-warning-class'}});
    toasteo.warning('My warning message');
    expect(document.querySelector('.toast.custom-warning-class')).not.toBeNull();
});

test('it can create a error toast', () => {
    let toasteo = new Toasteo();
    toasteo.error('My error message');
    expect(document.querySelector('.toast.toast--error')).not.toBeNull();
});

test('it can create a error toast with a custom class', () => {
    let toasteo = new Toasteo({classes: {error: 'custom-error-class'}});
    toasteo.error('My error message');
    expect(document.querySelector('.toast.custom-error-class')).not.toBeNull();
});

test('it can create a info toast', () => {
    let toasteo = new Toasteo();
    toasteo.info('My info message');
    expect(document.querySelector('.toast.toast--info')).not.toBeNull();
});

test('it can create a info toast with a custom class', () => {
    let toasteo = new Toasteo({classes: {info: 'custom-info-class'}});
    toasteo.info('My info message');
    expect(document.querySelector('.toast.custom-info-class')).not.toBeNull();
});

test('it can animate a toast on creation', () => {
    jest.useFakeTimers();
    let toasteo = new Toasteo();
    toasteo.success('My toast');
    expect(document.querySelector('.toast.toast--success.toast--creating')).not.toBeNull();
    setTimeout(() => {
        expect(document.querySelector('.toast.toast--success.toast--creating')).toBeNull();
        expect(document.querySelector('.toast.toast--success')).not.toBeNull();
    }, 100);
    jest.runAllTimers();
});    

test('it can disabled the creation animation of a toast as an option', () => {
    let toasteo = new Toasteo({animateOnCreation: false});
    toasteo.success('My toast');
    expect(document.querySelector('.toast.toast--success')).not.toBeNull();
    expect(document.querySelector('.toast.toast--success.toast--creating')).toBeNull();
});   

test('it can defined how long a toast should stay alive before getting closed or removed', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({duration: 500});
    toasteo.success('My toast');
    expect(document.querySelector('.toast.toast--success')).not.toBeNull();
    setTimeout(() => {
        expect(document.querySelector('.toast.toast--success')).toBeNull();
    }, 500);
    jest.runAllTimers();
});

test('it can animate a toast when removing it', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({animateOnCreation: false});
    let toast = toasteo.success('My toast');
    toasteo.closeToast(toast);
    setTimeout(() => {
        expect(toast.element.className).toBe('toast toast--success toast--closing');
    }, 50);
    jest.runAllTimers();
});

test('it can animate a toast when removing it using a custom class', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({animateOnCreation: false, classes: {closing: 'closing-custom-class'}});
    let toast = toasteo.success('My toast');
    toasteo.closeToast(toast);
    setTimeout(() => {
        expect(toast.element.className).toBe('toast toast--success closing-custom-class');
    }, 50);
    jest.runAllTimers();
});

test('it can close a toast', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({duration: 500, animateOnCreation: false});
    let toast = toasteo.success('My toast');
    toasteo.closeToast(toast);
    setTimeout(() => {
        expect(document.querySelector('.toast.toast--success')).not.toBeNull();
    }, 390);
    setTimeout(() => {
        expect(document.querySelector('.toast.toast--success')).toBeNull();
    }, 400);
    jest.runAllTimers();
});

test('it can close a toast with a custom duration', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({duration: 500, animateOnCreation: false, animationRemovingDuration: 100});
    let toast = toasteo.success('My toast');
    toasteo.closeToast(toast);
    setTimeout(() => {
        expect(document.querySelector('.toast.toast--success')).toBeNull();
    }, 100);
    jest.runAllTimers();
});

test('it can delete a toast', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({duration: 500, animateOnCreation: false});
    let toast = toasteo.success('My toast');
    toasteo.removeToast(toast);
    setTimeout(() => {
        expect(document.querySelector('.toast.toast--success')).toBeNull();
    }, 50);
    jest.runAllTimers();
});

test('it can remove all toasts', () => { 
    let toasteo = new Toasteo({duration: 100000, animateOnCreation: false});
    let toasts = [];
    for ( let i = 0; i < 10; i++ ) {
        toasteo.success('My toast #' + i);
    }
    
    expect(toasteo.toasts.length).toBe(10);
    toasteo.remove();

    expect(toasteo.toasts.length).toBe(0);
    expect(document.querySelectorAll('.toast.toast--success').length).toBe(0)
});

test('it can close all toasts', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({animationRemovingDuration: 100, animateOnCreation: false});
    let toasts = [];
    for ( let i = 0; i < 10; i++ ) {
        toasts.push( toasteo.success('My toast #' + i) );
    }
    
    expect(toasteo.toasts.length).toBe(10);
    
    toasteo.close();
    
    expect(document.querySelectorAll('.toast.toast--success.toast--closing').length).toBe(10);
    setTimeout(() => {
        expect(toasteo.toasts.length).toBe(0);
        expect(document.querySelector('.toast.toast--success')).toBeNull();
    }, 400);
    jest.runAllTimers();
});

test('it will remove a toast from its internal array after it gets removed', () => { 
    let toasteo = new Toasteo({duration: 10000, animationRemovingDuration: 100, animateOnCreation: false});
    let toast1 = toasteo.success('My message 1');
    let toast2 = toasteo.success('My message 2');
    let toast3 = toasteo.success('My message 3');
    expect(toasteo.toasts.length).toBe(3);

    toasteo.removeToast(toast2);

    expect(toasteo.toasts.length).toBe(2);
    expect(toasteo.toasts[0].element.innerHTML).toBe('My message 1');
    expect(toasteo.toasts[1].element.innerHTML).toBe('My message 3');

    toasteo.removeToast(toast1);

    expect(toasteo.toasts.length).toBe(1);
    expect(toasteo.toasts[0].element.innerHTML).toBe('My message 3');
});

test('it can remove a toast on click', () => { 
    let toasteo = new Toasteo({duration: 10000, animateOnRemoving: false, animateOnCreation: false});
    let toast = toasteo.success('My clickable toast');

    document.querySelector('.toast.toast--success').click();
    expect(toasteo.toasts.length).toBe(0);
    expect(document.querySelectorAll('.toast.toast--success').length).toBe(0);
});

test('it can disable the remove on click option', () => { 
    let toasteo = new Toasteo({closeOnClick: false, duration: 10000, animateOnRemoving: false, animateOnCreation: false});
    let toast = toasteo.success('My clickable toast');

    document.querySelector('.toast.toast--success').click();
    expect(toasteo.toasts.length).toBe(1);
    expect(document.querySelectorAll('.toast.toast--success').length).toBe(1);
});

test('it can close all toasts having a success type', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({animationRemovingDuration: 100, animateOnCreation: false});
    for ( let i = 0; i < 10; i++ ) {
        toasteo.success('My toast #' + i)
    }
    toasteo.error('My error toast');
    toasteo.warning('My warning toast');
    toasteo.info('My info toast');
    
    expect(toasteo.toasts.length).toBe(13);
    
    toasteo.close('success');
    
    expect(document.querySelectorAll('.toast.toast--success.toast--closing').length).toBe(10);
    setTimeout(() => {
        expect(toasteo.toasts.length).toBe(3);
        expect(document.querySelector('.toast.toast--success')).toBeNull();
        expect(document.querySelectorAll('.toast.toast--error').length).toBe(1);
        expect(document.querySelectorAll('.toast.toast--warning').length).toBe(1);
        expect(document.querySelectorAll('.toast.toast--info').length).toBe(1);
    }, 400);
    jest.runAllTimers();
});

test('it can close all toasts having a error type', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({animationRemovingDuration: 100, animateOnCreation: false});
    for ( let i = 0; i < 10; i++ ) {
        toasteo.error('My toast #' + i)
    }
    toasteo.success('My success toast');
    toasteo.warning('My warning toast');
    toasteo.info('My info toast');
    
    expect(toasteo.toasts.length).toBe(13);
    
    toasteo.close('error');
    
    expect(document.querySelectorAll('.toast.toast--error.toast--closing').length).toBe(10);
    setTimeout(() => {
        expect(toasteo.toasts.length).toBe(3);
        expect(document.querySelector('.toast.toast--error')).toBeNull();
        expect(document.querySelectorAll('.toast.toast--success').length).toBe(1);
        expect(document.querySelectorAll('.toast.toast--warning').length).toBe(1);
        expect(document.querySelectorAll('.toast.toast--info').length).toBe(1);
    }, 400);
    jest.runAllTimers();
});

test('it can close all toasts having a warning type', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({animationRemovingDuration: 100, animateOnCreation: false});
    for ( let i = 0; i < 10; i++ ) {
        toasteo.warning('My toast #' + i)
    }
    toasteo.success('My success toast');
    toasteo.error('My error toast');
    toasteo.info('My info toast');
    
    expect(toasteo.toasts.length).toBe(13);
    
    toasteo.close('warning');
    
    expect(document.querySelectorAll('.toast.toast--warning.toast--closing').length).toBe(10);
    setTimeout(() => {
        expect(toasteo.toasts.length).toBe(3);
        expect(document.querySelector('.toast.toast--warning')).toBeNull();
        expect(document.querySelectorAll('.toast.toast--success').length).toBe(1);
        expect(document.querySelectorAll('.toast.toast--error').length).toBe(1);
        expect(document.querySelectorAll('.toast.toast--info').length).toBe(1);
    }, 400);
    jest.runAllTimers();
});

test('it can close all toasts having a info type', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({animationRemovingDuration: 100, animateOnCreation: false});
    for ( let i = 0; i < 10; i++ ) {
        toasteo.info('My toast #' + i)
    }
    toasteo.success('My success toast');
    toasteo.error('My error toast');
    toasteo.warning('My warning toast');
    
    expect(toasteo.toasts.length).toBe(13);
    
    toasteo.close('info');
    
    expect(document.querySelectorAll('.toast.toast--info.toast--closing').length).toBe(10);
    setTimeout(() => {
        expect(toasteo.toasts.length).toBe(3);
        expect(document.querySelector('.toast.toast--info')).toBeNull();
        expect(document.querySelectorAll('.toast.toast--success').length).toBe(1);
        expect(document.querySelectorAll('.toast.toast--warning').length).toBe(1);
        expect(document.querySelectorAll('.toast.toast--error').length).toBe(1);
    }, 400);
    jest.runAllTimers();
});

test('it can remove all toasts having a given type', () => { 
    jest.useFakeTimers();
    let toasteo = new Toasteo({animationRemovingDuration: 100, animateOnCreation: false});
    for ( let i = 0; i < 10; i++ ) {
        toasteo.warning('My toast #' + i)
    }
    toasteo.error('My error toast');
    toasteo.success('My sucess toast');
    toasteo.info('My info toast');
    
    expect(toasteo.toasts.length).toBe(13);
    
    toasteo.remove('success');
    expect(toasteo.toasts.length).toBe(12);

    toasteo.remove('warning');
    expect(toasteo.toasts.length).toBe(2);

    toasteo.remove('info');
    expect(toasteo.toasts.length).toBe(1);

    toasteo.remove('error');
    expect(toasteo.toasts.length).toBe(0);
});