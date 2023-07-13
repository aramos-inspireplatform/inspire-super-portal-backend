export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return Math.round(Number(data) * 100) / 100;
  }
}
