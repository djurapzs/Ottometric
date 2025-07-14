import { ICalculationHelper, IColumnCalculationResult } from "../interfaces";

/**
 * Helper class for table calculations implementing the ICalculationHelper interface
 */
export class TableCalculationHelper implements ICalculationHelper {
  /**
   * Parses a string percentage value into a number.
   * @param text - The string to parse (e.g., "99.9%").
   * @returns The parsed number.
   */
  parsePercentage(text: string): number {
    return parseFloat(text.trim().replace("%", ""));
  }

  /**
   * Extracts and parses the numerical values from the footer row of a table.
   * It assumes the footer is the last 'tr' element within the table.
   * @param table - The table element chainable.
   * @returns A Cypress chainable that resolves to an array of numbers.
   */
  getFooterValues(
    table: Cypress.Chainable<JQuery<HTMLElement>>
  ): Cypress.Chainable<number[]> {
    const footerValues: number[] = [];
    return table
      .find("tr")
      .last()
      .find("td")
      .each(($td, index) => {
        const rawText = Cypress.$($td).text().trim();
        console.log(`Footer column ${index} raw text:`, rawText);
        footerValues.push(this.parsePercentage(rawText));
      })
      .then(() => footerValues);
  }

  /**
   * Calculates the average for each column in a table containing percentage values.
   * It intelligently filters out non-data rows and the footer row.
   * @param table - The table element chainable.
   * @param footerValues - An array of the footer values to exclude from calculation.
   * @returns A Cypress chainable that resolves to an array of calculated averages.
   */
  calculateColumnAverages(
    table: Cypress.Chainable<JQuery<HTMLElement>>,
    footerValues: Cypress.Chainable<number[]>
  ): Cypress.Chainable<number[]> {
    const columnSums: number[] = [];
    const columnCounts: number[] = [];

    return footerValues.then((footerArr) => {
      return table
        .find("tr")
        .each(($row) => {
          // Process only rows that appear to contain data (have a '%' sign)
          if ($row.text().includes("%")) {
            const firstCellValue = this.parsePercentage(
              $row.find("td").first().text()
            );

            // Exclude the footer row from the calculation by checking if its first cell
            // matches the first footer value.
            if (firstCellValue !== footerArr[0]) {
              $row.find("td").each((cellIndex, cell) => {
                const cellValue = this.parsePercentage(Cypress.$(cell).text());

                if (!isNaN(cellValue)) {
                  columnSums[cellIndex] =
                    (columnSums[cellIndex] || 0) + cellValue;
                  columnCounts[cellIndex] = (columnCounts[cellIndex] || 0) + 1;
                }
              });
            }
          }
        })
        .then(() => {
          // Calculate the final average for each column
          return columnSums.map((sum, index) => sum / columnCounts[index]);
        });
    });
  }

  /**
   * Gets detailed calculation results for all columns
   * @param table - The table element chainable.
   * @param footerValues - An array of the footer values.
   * @returns A Cypress chainable that resolves to detailed calculation results.
   */
  getColumnCalculationResults(
    table: Cypress.Chainable<JQuery<HTMLElement>>,
    footerValues: Cypress.Chainable<number[]>
  ): Cypress.Chainable<IColumnCalculationResult[]> {
    const columnSums: number[] = [];
    const columnCounts: number[] = [];

    return footerValues.then((footerArr) => {
      return table
        .find("tr")
        .each(($row) => {
          if ($row.text().includes("%")) {
            const firstCellValue = this.parsePercentage(
              $row.find("td").first().text()
            );

            if (firstCellValue !== footerArr[0]) {
              $row.find("td").each((cellIndex, cell) => {
                const cellValue = this.parsePercentage(Cypress.$(cell).text());

                if (!isNaN(cellValue)) {
                  columnSums[cellIndex] =
                    (columnSums[cellIndex] || 0) + cellValue;
                  columnCounts[cellIndex] = (columnCounts[cellIndex] || 0) + 1;
                }
              });
            }
          }
        })
        .then(() => {
          return columnSums.map(
            (sum, index): IColumnCalculationResult => ({
              columnIndex: index,
              sum,
              count: columnCounts[index],
              average: sum / columnCounts[index],
              footerValue: footerArr[index],
            })
          );
        });
    });
  }
}

// Create instance for backward compatibility
const tableCalculationHelper = new TableCalculationHelper();

// Export individual functions for backward compatibility
export const parsePercentage = (text: string): number =>
  tableCalculationHelper.parsePercentage(text);

export const getFooterValues = (
  table: Cypress.Chainable<JQuery<HTMLElement>>
): Cypress.Chainable<number[]> => tableCalculationHelper.getFooterValues(table);

export const calculateColumnAverages = (
  table: Cypress.Chainable<JQuery<HTMLElement>>,
  footerValues: Cypress.Chainable<number[]>
): Cypress.Chainable<number[]> =>
  tableCalculationHelper.calculateColumnAverages(table, footerValues);
