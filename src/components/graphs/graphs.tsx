import { useTranslation } from "react-i18next";
import { BarChart, PieChart } from "@mui/x-charts";
import { getCataloguesRequest } from "../../api/catalogues";
import { useAuthHeader } from "react-auth-kit";
import { useState } from "react";
import { Catalogue } from "../../interfaces/catalogue.interface";
import { RESPONSIBLE_IDENTITY } from "../../utils/enums/responsible-identity.enum";

function GraphList() {
  const [t, i18n] = useTranslation();
  const [catalogues, setCatalogues] = useState<Catalogue[]>([]);
  const authHeader = useAuthHeader();
  const chartSettings = {
    width: 500,
    height: 300,
    backgroundColor: "red",
  };

  function contarValoresUnicos() {
    const contador = {};
    const filtrCatalogues = catalogues.filter(
      (c) =>
        c.verified === true ||
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
    return resultado;
  }

  async function getAndSetCatalogues() {
    await getCataloguesRequest(authHeader())
      .then((response) => response.json())
      .then((data) => {
        setCatalogues(data);
      });
  }

  getAndSetCatalogues();

  return (
    <>
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
              catalogues.filter((obj) => obj.masterData === true).length,
              catalogues.filter((obj) => obj.referenceData === true).length,
              catalogues.filter((obj) => obj.highValue === true).length,
              catalogues.filter((obj) => obj.activeAds === true).length,
              catalogues.filter((obj) => obj.sharedData === true).length,
              catalogues.filter((obj) => obj.VLCi === true).length,
              catalogues.filter((obj) => obj.ArcGIS === true).length,
              catalogues.filter((obj) => obj.CKAN === true).length,
              catalogues.filter((obj) => obj.MongoDB === true).length,
              catalogues.filter((obj) => obj.autoAcess === true).length,
              catalogues.filter((obj) => obj.genderInfo === true).length,
              catalogues.filter((obj) => obj.RAT === true).length,
              catalogues.filter((obj) => obj.dataAnonymize === true).length,
            ],
          },
        ]}
        {...chartSettings}
      />
      <PieChart
        series={[
          {
            data: contarValoresUnicos(),
          },
        ]}
        width={1000}
        height={500}
      />
    </>
  );
}

export { GraphList };
