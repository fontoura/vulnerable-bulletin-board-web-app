import {useEffect} from 'react';

export default function useComponentClass(component, className) {
    useEffect(
        () => {
            if (typeof className === 'string') {
                className = className.split(' ');
            }

            className.forEach(className => component.classList.add(className));

            return () => {
                className.forEach(className => component.classList.remove(className));
            };
        },
        [className, component]
    );
}
