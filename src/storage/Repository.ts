import BaseEntity from './BaseEntity';

export default class Table {
  Entity: any;
  data: Map<number, BaseEntity | undefined> = new Map<number,BaseEntity>();

  constructor(entity: any) {
    this.Entity = entity;
  }

  insert(record: BaseEntity): void {
    this.data.set(record.id, record);
  }
  update(id: number, record: any): void {
    this.data.set(id, Object.assign({}, this.data.get(id), record));
  }
  delete(id: number): void {
    this.data.set(id, undefined);
  }
  select(filter?: (r: BaseEntity, i: number) => {} | undefined): (BaseEntity | undefined)[] {
    const result = [...this.data.values()];
    if (!filter) return result;
    return result.filter(filter);
  }
  selectOne(find: (r: BaseEntity, i: number) => boolean): BaseEntity | undefined {
    const result = [...this.data.values()];
    return result.find(find);
  }
}
