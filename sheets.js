let turnos;

async function getTurnos() {
    let response;
    try {
        // Fetch data from the specified range in the Google Sheets
        response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1WJwEe4IbF1T0yr4h7rilRyFWdOyIk47-1Jya7qQx8es",
            range: "Info_Web!A:G", // Define the range in the spreadsheet
        });
    } catch (err) {
        console.error("Error fetching data from Google Sheets: ", err);
        return;
    }

    const range = response.result;
    if (!range || !range.values || range.values.length === 0) {
        console.warn("No values found in the sheet.");
        return;
    }
    async function addTurnoToSheet(turno, nota, fecha) {
        let response;
        try {
            response = await gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: "1WJwEe4IbF1T0yr4h7rilRyFWdOyIk47-1Jya7qQx8es", // ID de tu hoja de cálculo
                range: "Info_Web!A:C", // Define el rango donde se añadirán los datos
                valueInputOption: "RAW", // RAW para guardar los datos como se introducen
                resource: {
                    values: [
                        [fecha, turno, nota] // Enviar fecha, turno y nota
                    ],
                },
            });
            console.log("Turno añadido a la hoja de cálculo:", response);
        } catch (err) {
            console.error("Error añadiendo el turno a la hoja de cálculo: ", err);
        }
    }
    
};
