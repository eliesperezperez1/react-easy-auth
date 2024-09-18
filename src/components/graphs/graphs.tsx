import { useTranslation } from "react-i18next";
import { BarChart, PieChart } from "@mui/x-charts";
import { getCataloguesRequest } from "../../api/catalogues";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import { useEffect, useState } from "react";
import { Catalogue } from "../../interfaces/catalogue.interface";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import baseTheme from "../darkModeSwitch/darkmodeTheme";
import useAlternateTheme from "../darkModeSwitch/alternateTheme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { THEMEAPP } from "../../utils/enums/themeApp.enum";

/**
 * Renders a list of graphs based on the catalogues data. The first graph is a pie chart that displays the count of unique values in the `responsibleIdentity` property of the `catalogues` array. The second graph is a bar chart that displays the count of catalogues for each unique value in the `responsibleIdentity` property.
 *
 * @return {JSX.Element} The rendered list of graphs.
 */
function GraphList() {
  const [t, i18n] = useTranslation();
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const [filteredCatalogues, setFilteredCatalogues] = useState<Catalogue[]>([]);
  const [results, setResults] = useState<[]>([]);
  const [filter, setFilter] = useState<RESPONSIBLE_IDENTITY>();
  const authHeader = useAuthHeader();
  const user = useAuthUser();
  const { actualTheme } = useAlternateTheme();
  const dynamicStyle = {
    backgroundColor: actualTheme === THEMEAPP.light ? "white" : "#252525",
    color: actualTheme === THEMEAPP.light ? "#252525" : "white",
  };

  useEffect(() => {
    if (user() !== null) {
      const a = user() ? user().user : userMock;
      getAndSetCatalogues();
      contarValoresUnicos();
    }
  }, [user(), catalogues]);

  const chartSettings = {
    width: 500,
    height: 300,
    backgroundColor: "red",
  };

  /**
   * Filters the catalogues based on the provided filter value. If no filter is provided,
   * all catalogues are returned. Otherwise, only catalogues with a matching responsibleIdentity
   * value are included in the filtered result.
   *
   * @return {void} This function does not return a value.
   */
  function filterCatalogues() {
    setFilteredCatalogues(
      filter === undefined
        ? catalogues
        : catalogues.filter((c) => c.responsibleIdentity === filter)
    );
  }

/**
 * Counts the unique values in the `responsibleIdentity` property of the `catalogues` array.
 * Filters out any catalogues with a `verified` property of `false` or a `responsibleIdentity`
 * of `RESPONSIBLE_IDENTITY.GENERAL`. Then, it counts the occurrences of each unique value
 * and returns an array of objects with `label` and `value` properties.
 *
 * @return {Array<{label: string, value: number}>} An array of objects with `label` and `value`
 * properties, where `label` is the unique value and `value` is the number of occurrences.
 */
  function contarValoresUnicos() {
    const contador = {};
    const filtrCatalogues = catalogues.filter(
      (c) =>
        c.verified !== false &&
        c.responsibleIdentity !== RESPONSIBLE_IDENTITY.GENERAL
    );
    filtrCatalogues.forEach((obj) => {
      const valor = obj.responsibleIdentity;
      contador[valor] = (contador[valor] || 0) + 1;
    });

    const resultado = Object.entries(contador).map(([valor, cantidad]) => ({
      label: valor,
      value: cantidad,
    }));
    setResults(resultado);
  }

  /**
   * Asynchronously fetches catalogues from the server using the auth header and updates the catalogues state with the received data.
   *
   * @return {Promise<void>} A Promise that resolves when the catalogues are fetched and the state is updated.
   */
  async function getAndSetCatalogues() {
    await getCataloguesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        setCatalogues(data);
      });
  }

  return (
    <>
      <ThemeProvider theme={baseTheme(actualTheme)}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Relación de datasets por servicio
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                ...dynamicStyle,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PieChart
                series={[
                  {
                    data: results,
                  },
                ]}
                height={350}
                slotProps={{
                  legend: { hidden: true },
                }}
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Relación valores de datasets por servicio
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                ...dynamicStyle,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Select
                id="filter"
                name="filter"
                margin="dense"
                defaultValue={RESPONSIBLE_IDENTITY.bombers}
                onChange={(event) => {
                  setFilter(event.target.value as RESPONSIBLE_IDENTITY);
                  filterCatalogues();
                }}
              >
                {Object.entries(RESPONSIBLE_IDENTITY).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      t("columnsNames.masterData"),
                      t("columnsNames.referenceData"),
                      t("columnsNames.highValue"),
                      t("columnsNames.activeAds"),
                      t("columnsNames.sharedData"),
                      "VLCi",
                      "ArcGIS",
                      "CKAN",
                      "MongoDB",
                      t("columnsNames.autoAcess"),
                      "RAT",
                      t("columnsNames.genderInfo"),
                      t("columnsNames.dataAnonymize"),
                    ],
                  },
                ]}
                series={[
                  {
                    data: [
                      filteredCatalogues.filter(
                        (obj) => obj.masterData === true
                      ).length,
                      filteredCatalogues.filter(
                        (obj) => obj.referenceData === true
                      ).length,
                      filteredCatalogues.filter((obj) => obj.highValue === true)
                        .length,
                      filteredCatalogues.filter((obj) => obj.activeAds === true)
                        .length,
                      filteredCatalogues.filter(
                        (obj) => obj.sharedData === true
                      ).length,
                      filteredCatalogues.filter((obj) => obj.VLCi === true)
                        .length,
                      filteredCatalogues.filter((obj) => obj.ArcGIS === true)
                        .length,
                      filteredCatalogues.filter((obj) => obj.CKAN === true)
                        .length,
                      filteredCatalogues.filter((obj) => obj.MongoDB === true)
                        .length,
                      filteredCatalogues.filter((obj) => obj.autoAcess === true)
                        .length,
                      filteredCatalogues.filter(
                        (obj) => obj.genderInfo === true
                      ).length,
                      filteredCatalogues.filter((obj) => obj.RAT === true)
                        .length,
                      filteredCatalogues.filter(
                        (obj) => obj.dataAnonymize === true
                      ).length,
                    ],
                  },
                ]}
                {...chartSettings}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
    </>
  );
}

export { GraphList };
