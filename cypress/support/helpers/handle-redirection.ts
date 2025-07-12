// cypress/support/helpers/handle-redirection.ts

/**
 * Waits for a redirection request and navigates to the resulting KPI details page.
 *
 * @param programId - The ID of the camera program (e.g., "VI1")
 * @param zone - The zone name (e.g., "zone1")
 */
export function followRedirectionAndVisit(
  programId: string,
  zone: string
): void {
  cy.wait("@redirectRequest").then((interception) => {
    const guid = extractGuidFromResponse(interception.response?.body);

    const redirectUrl = buildKpiDetailsUrl(programId, zone, guid);

    cy.visit(redirectUrl);

    assertKpiDetailsPageLoaded();
  });
}

function extractGuidFromResponse(responseBody: unknown): string {
  if (typeof responseBody !== "string") {
    throw new Error("Redirection response is not a string");
  }

  const cleanedGuid = responseBody.replace(/"/g, "");

  const isValidGuid = /^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}$/i.test(
    cleanedGuid
  );

  if (!isValidGuid) {
    throw new Error(`Invalid GUID format received: ${cleanedGuid}`);
  }

  return cleanedGuid;
}

function buildKpiDetailsUrl(
  programId: string,
  zone: string,
  guid: string
): string {
  const baseUrl = Cypress.config().baseUrl;
  return `${baseUrl}/programs/${programId}/${zone}/kpi-details?guid=${guid}`;
}

function assertKpiDetailsPageLoaded(): void {
  cy.contains("Drive ID").should("exist");
}
