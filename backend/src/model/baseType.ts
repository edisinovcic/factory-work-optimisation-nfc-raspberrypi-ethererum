type BaseType<T> = {
    toObject(_id: number, _active: boolean, _skills: string): any;
    fromObject(_employee: T): any;
};