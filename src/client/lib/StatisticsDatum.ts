export default class StatisticsDatum {
  public id: number;
  public label: string;
  public value: number;

  public constructor(id: number, label: string, value: number) {
    this.id = id;
    this.label = label;
    this.value = value;
  }
}
