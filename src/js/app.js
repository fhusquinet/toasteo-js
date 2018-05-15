import Toasteo from './classes/Toasteo';

module.exports = Toasteo;
if (typeof window !== 'undefined') {
    window.Toasteo = new Toasteo();
}