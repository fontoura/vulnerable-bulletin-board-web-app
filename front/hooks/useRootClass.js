import useComponentClass from './useComponentClass';

export default function useRootClass(className) {
    useComponentClass(document.getElementById('root'), className);
}
