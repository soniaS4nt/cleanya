import dayjs from 'dayjs'
import { BookingData } from '@/reducers/dataBooking'

export const generateHtml = (data: BookingData) => {
  const { client, detalles, fechaHora, pago, requirements } = data
  const formattedPago = pago?.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
  })
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <style type="text/css">
          body, table, td, a {
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
          }
          table {
              border-collapse: collapse !important;
          }
          body {
              height: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
          }
          @media screen and (max-width: 525px) {
              .wrapper {
                  width: 100% !important;
                  max-width: 100% !important;
              }
              .responsive-table {
                  width: 100% !important;
              }
              .padding {
                  padding: 10px 5% 15px 5% !important;
              }
              .section-padding {
                  padding: 0 15px 50px 15px !important;
              }
          }
          .form-container {
              margin-bottom: 24px;
              padding: 20px;
              border: 1px dashed #ccc;
          }
          .form-heading {
              color: #2a2a2a;
              font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
              font-weight: 400;
              text-align: left;
              line-height: 20px;
              font-size: 18px;
              margin: 0 0 8px;
              padding: 0;
          }
          .form-answer {
              color: #2a2a2a;
              font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
              font-weight: 300;
              text-align: left;
              line-height: 20px;
              font-size: 16px;
              margin: 0 0 24px;
              padding: 0;
          }
          div[style*="margin: 16px 0;"] {
              margin: 0 !important;
          }
          .fecha-hora {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .fecha-hora p {
            margin: 10px; 
        }
      </style>
  </head>
  <body style="margin: 0 !important; padding: 0 !important; background: #fff">
  <p>Hola ${client.fullName}</p>
  <p>Le agradecemos sinceramente por su petición de reserva. A continuación, encontrará los detalles relacionados con su solicitud:</p>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
              <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table">
                      <tr>
                          <td>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td>
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                              <tr>
                                                  <td style="padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323;" class="padding message-content">
                                                      <h2>Resumen de la reserva</h2>
                                                      <div class="form-container">
                                                      <ul>
                                                      <li>
                                                          ${
                                                            requirements.rooms
                                                              ? requirements
                                                                  .rooms
                                                                  .value ===
                                                                'Estudio'
                                                                ? 'Estudio'
                                                                : `${parseInt(
                                                                    requirements
                                                                      .rooms
                                                                      .value
                                                                  )} habitacion${
                                                                    parseInt(
                                                                      requirements
                                                                        .rooms
                                                                        .value
                                                                    ) > 1
                                                                      ? 'es'
                                                                      : ''
                                                                  }`
                                                              : 'No especificado'
                                                          }
                                                      </li>
                                                      <li>
                                                            ${
                                                              requirements.bathrooms
                                                                ? `${parseInt(
                                                                    requirements
                                                                      .bathrooms
                                                                      .value
                                                                  )} ${
                                                                    parseInt(
                                                                      requirements
                                                                        .bathrooms
                                                                        .value
                                                                    ) > 1
                                                                      ? 'baños'
                                                                      : 'baño'
                                                                  }`
                                                                : 'No especificado'
                                                            }
                                                        </li>
                                                        <li>
                                                            ${
                                                              requirements.tipo
                                                                ? requirements
                                                                    .tipo.value
                                                                : 'No especificado'
                                                            }
                                                        </li>
                                                    </ul>
                                                    <div class="fecha-hora">
                                                        <p>Fecha: ${
                                                          fechaHora.fecha
                                                            ? dayjs(
                                                                fechaHora.fecha
                                                              ).format(
                                                                'DD/MM/YYYY'
                                                              )
                                                            : 'No especificado'
                                                        }
                                                        </p>
                                                        <p>Hora: ${
                                                          fechaHora.hora
                                                            .length > 0
                                                            ? fechaHora.hora
                                                            : 'No especificado'
                                                        }</p>
                                                        </div>
                                                        <p style="border: 2px solid #12a4d9; border-radius: 0.5rem; padding: 0.5rem;">
                                                            Pago Total: ${formattedPago}
                                                        </p>
                                                  </td>
                                              </tr>
                                          </table>
                                      </td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `
}
