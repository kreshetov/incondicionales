import {
  app,
  input,
  output,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

// Leer el contenido actual del JSON
const blobInput = input.storageBlob({
  path: 'partidos/partidos/lista',
  connection: 'AzureWebJobsStorage',
});

// Salida para sobrescribir el archivo JSON
const blobOutput = output.storageBlob({
  path: 'partidos/partidos/lista',
  connection: 'AzureWebJobsStorage',
});

export async function ActualizarLista(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  try {
    context.log('Recibiendo nueva lista de jugadores...');

    const nuevaLista = await request.json();

    if (!Array.isArray(nuevaLista)) {
      return {
        status: 400,
        body: 'Formato incorrecto: se esperaba un array de nombres.',
      };
    }

    // Validación opcional: limitar a 30 jugadores
    if (nuevaLista.length > 30) {
      return {
        status: 400,
        body: 'Máximo 30 jugadores permitidos.',
      };
    }

    // Sobrescribe el blob con la nueva lista
    context.extraOutputs.set(blobOutput, JSON.stringify(nuevaLista, null, 2));

    context.log('Lista actualizada correctamente.');
    return {
      status: 200,
      body: 'Lista de jugadores actualizada correctamente.',
    };
  } catch (error) {
    context.log(`Error: ${error}`);
    return {
      status: 500,
      body: 'Error interno al actualizar la lista.',
    };
  }
}

app.http('ActualizarLista', {
  methods: ['PUT'],
  authLevel: 'anonymous',
  handler: ActualizarLista,
  extraInputs: [blobInput],
  extraOutputs: [blobOutput],
});
