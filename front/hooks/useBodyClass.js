import useComponentClass from './useComponentClass';

export default function useBodyClass(className) {
    useComponentClass(document.body, className);
}
