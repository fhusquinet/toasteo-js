var Toasteo = require('./classes/Toasteo');

module.exports = Toasteo;
if (typeof window !== 'undefined') {
    window.Toasteo = Toasteo;
}