import chalk from 'chalk';
import Table from 'cli-table';

/**
 * Creates a table given a key/value 2d array.
 * @param kvs The table's key/values (Field, Value, (Optional) Link)
 */
export default async function printTable(kvs: any[][]) {
  let header = ['Field', 'Value'];
  if (kvs[0].length === 3) header.push('Link');
  const table = new Table({
    head: header.map((v) => chalk.underline.bold(v))
  });
  kvs.map(v => {
    v[0] = chalk.bold(v[0]);
    table.push(v);
  });
  console.log(table.toString());
}
