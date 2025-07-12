/**
 * Parses a string percentage value into a number.
 * @param text - The string to parse (e.g., "99.9%").
 * @returns The parsed number.
 */
const parsePercentage = (text: string): number => {
  return parseFloat(text.trim().replace("%", ""));
};

/**
 * Extracts and parses the numerical values from the footer row of a table.
 * It assumes the footer is the last 'tr' element within the table.
 * @param tableSelector - The CSS selector for the table.
 * @returns A Cypress chainable that resolves to an array of numbers.
 */
export const getFooterValues = (
  table: Cypress.Chainable<JQuery<HTMLElement>>
): Cypress.Chainable<number[]> => {
  const footerValues: number[] = [];
  return table
    .find("tr")
    .last()
    .find("td")
    .each(($td, index) => {
      const rawText = Cypress.$($td).text().trim();
      console.log(`Footer column ${index} raw text:`, rawText);
      footerValues.push(parsePercentage(rawText));
    })
    .then(() => footerValues);
};

/**
 * Calculates the average for each column in a table containing percentage values.
 * It intelligently filters out non-data rows and the footer row.
 * @param tableSelector - The CSS selector for the table.
 * @param footerValues - An array of the footer values to exclude from calculation.
 * @returns A Cypress chainable that resolves to an array of calculated averages.
 */
export const calculateColumnAverages = (
  table: Cypress.Chainable<JQuery<HTMLElement>>,
  footerValues: Cypress.Chainable<number[]>
): Cypress.Chainable<number[]> => {
  const columnSums: number[] = [];
  const columnCounts: number[] = [];

  return footerValues.then((footerArr) => {
    return table
      .find("tr")
      .each(($row) => {
        // Process only rows that appear to contain data (have a '%' sign)
        if ($row.text().includes("%")) {
          const firstCellValue = parsePercentage(
            $row.find("td").first().text()
          );

          // Exclude the footer row from the calculation by checking if its first cell
          // matches the first footer value.
          if (firstCellValue !== footerArr[0]) {
            $row.find("td").each((cellIndex, cell) => {
              const cellValue = parsePercentage(Cypress.$(cell).text());

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
};
