import React, { useEffect, useRef, useState } from "react";
import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import "handsontable/dist/handsontable.full.css";
import { HyperFormula } from "hyperformula";

registerAllModules();
registerLanguageDictionary(esMX);

const TableNew = () => {
  const [usuarios, setUsuarios] = useState([]);

  const [autocomplete, setAutocomplete] = useState([]);

  const hotTableComponent = useRef(null);

  const descargarArchivo = () => {
    const pluginDescarga =
      hotTableComponent.current.hotInstance.getPlugin("exportFile");

    pluginDescarga.downloadFile("csv", {
      filename: "usuarios",
      fileExtension: "csv",
      mimeType: "text/csv",
      columnHeaders: true,
    });
  };
  const formatCOP = {
    pattern: "0,0 $",
    culture: "es-MX",
  };
  const description = () => {
    const description = usuarios.map((usuario) => usuario.descripcion);
    setAutocomplete(description);
  };
  useEffect(() => {
    description();
  }, [usuarios]);
  console.log(usuarios);
  return (
    <div>
      <button onClick={() => descargarArchivo()}>Descargar Archivo</button>
      <HotTable
        height="auto"
        ref={hotTableComponent}
        language={esMX.languageCode}
        data={usuarios}
        licenseKey="non-commercial-and-evaluation"
        colHeaders={true}
        rowHeaders={true}
        columnSorting={true}
        mergeCells={true}
        contextMenu={true}
        readOnly={false}
        manualColumnResize={true}
        manualRowResize={true}
        manualRowMove={true}
        formulas={{ engine: HyperFormula }}
        autofill={true}
      >
        <HotColumn data="Ítem" title="Ítem" />
        <HotColumn
          type="autocomplete"
          source={autocomplete}
          data="descripcion"
          title="Descripción"
          width={300}
        />
        <HotColumn data="Unidad" title="Unidad" />
        <HotColumn type="numeric" data="D" title="Cantidad" />
        <HotColumn
          type="numeric"
          numericFormat={formatCOP}
          data="E"
          title="Costo Unitario"
        />
        <HotColumn
          type="numeric"
          numericFormat={formatCOP}
          data="F1"
          title="Valor Total"
          autoColumnSize={true}
          value="=D1*E1"
        />
      </HotTable>
    </div>
  );
};

export default TableNew;
