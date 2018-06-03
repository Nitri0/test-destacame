export const forms = {
  chofer: {
    urlCrud:"chofer/",
    mainLabelPlural: "Choferes",
    mainLabelSingular: "Chofer",
    name:"chofer",
    list:{
      attrForLabel:[
        {label:"Nombre Completo", index:"nombre_completo"}, 
      ],
      canEdit: true,
      canDelete: false,
    },
    inputs: [
      {
          label: "Nombre completo",
          inputName:"nombre_completo",
          placeholder: "Homero Hernandez",
          isRequired: true,
          type: "input"
      },
      {
          label: "Documento de identidad",
          inputName:"documento_identidad",
          placeholder: "133641693",
          isRequired: true,
          type: "input"
      },
    ],
  },

  trayecto: {
    urlCrud:"trayecto/",
    mainLabelPlural: "Trayectos",
    mainLabelSingular: "Trayecto",
    name: "trayecto",
    list:{
      attrForLabel:[
        {label:"Nombre Proyecto", index:"nombre_trayecto"}, 
        {label:"Promedio tickets vendidos", index:"promedio_pasajeros"}, 
        {label:"Cantidad de viajes", index:"cantidad_viajes"}, 
      ],
      canEdit: true,
      canDelete: true,
    },
    inputs: [
      {
          label: "Nombre de trayecto",
          inputName:"nombre_trayecto",
          placeholder: "Ruta 1: santa isabel - san francisco",
          isRequired: true,
          type: "input"
      },
      {
          label: "Origen",
          inputName:"origen",
          placeholder: "Santa isabel 157",
          isRequired: true,
          type: "input"
      },
      {
        label: "Destino",
        inputName:"destino",
        placeholder: "San francisco 42",
        isRequired: true,
        type: "input"
      }
    ],
  },

  bus: {
    urlCrud:"bus/",
    mainLabelPlural: "Buses",
    mainLabelSingular: "Bus",
    name: "bus",
    list:{
      attrForLabel:[
        {label:"Matricula", index:"matricula"}, 
      ],
      canEdit: true,
      canDelete: false,
    },
    requiredSelectData:[
      {
        uri: "chofer/",
        varResultName:"choferes",
      }
    ],
    inputs: [
      {
        label: "Matricula",
        inputName:"matricula",
        placeholder: "",
        isRequired: true,
        type: "input"
      },
      {
        label: "Numero de asientos",
        inputName:"max_asientos",
        placeholder: "",
        isRequired: true,
        type: "input"
      },
      {
        label: "Chofer",
        inputName:"chofer",
        type: "select",
        isRequired: true,
        selectData:{
          attrOptionLabel: "nombre_completo",
          attrOptionValue: "id",
          defaultOption: "Seleccione un chofer",
          varResultName: "choferes"
        }
      }
    ],
  },  

  horario: {
    urlCrud:"horario/",
    mainLabelPlural: "Horario",
    mainLabelSingular: "Horarios",
    name: "horario",
    list:{
      attrForLabel:[
        {label:"Nombre", index:"nombre_horario"}, 
      ],
      canEdit: true,
      canDelete: true,
    },
    // requiredSelectData:[
    //   {
    //     defaultValues:[
    //       {nombre: "lunes", val:"lunes"},
    //       {nombre: "martes", val:"martes"},
    //       {nombre: "miercoles", val:"miercoles"},
    //       {nombre: "jueves", val:"jueves"},
    //       {nombre: "viernes", val:"viernes"},
    //     ],
    //     varResultName:"dias",
    //   }
    // ],
    inputs: [
      {
          label: "Nombre de Horario",
          inputName:"nombre_horario",
          placeholder: "hora 8 a 9",
          isRequired: true,
          type: "input"
      },
      // {
      //   label: "Dia de la semana",
      //   inputName:"dia",
      //   type: "select",
      //   isRequired: true,
      //   selectData:{
      //     attrOptionLabel: "nombre",
      //     attrOptionValue: "val",
      //     defaultOption: "Seleccione un dia de la semana",
      //     varResultName: "dias"
      //   }
      // },
      {
          label: "Hora de salida (hora militar)",
          inputName:"hora_salida",
          placeholder: "9:00",
          isRequired: true,
          type: "input"
      },
      {
        label: "Hora de llegada (hora militar)",
        inputName:"hora_llegada",
        placeholder: "15:00",
        isRequired: true,
        type: "input"
      }
    ],
  },

  viaje: {
    urlCrud:"viaje/",
    mainLabelPlural: "Viajes",
    mainLabelSingular: "Viaje",
    name: "viaje",
    list:{
      attrForLabel:[
        {label:"Nombre de Viaje", index:"nombre_viaje"}, 
        {label:"Puestos disponibles", index:"puestos_disponibles"}
      ],
      canEdit: false,
      canDelete: false,
    },
    requiredSelectData:[
      {
        uri: "trayecto/",
        varResultName:"trayectos",
      },
      {
        uri: "bus/",
        varResultName:"buses",
      },
      {
        uri: "horario/",
        varResultName:"horarios",
      }
    ],
    inputs: [
      {
        label: "Nombre de viaje",
        inputName:"nombre_viaje",
        placeholder: "Santa isabel - Santa lucia 9-10",
        isRequired: true,
        type: "input"
      },
      {
        label: "Trayecto",
        inputName:"trayecto",
        type: "select",
        isRequired: true,
        selectData:{
          attrOptionLabel: "nombre_trayecto",
          attrOptionValue: "id",
          defaultOption: "Seleccione un Trayecto de viaje",
          varResultName: "trayectos"
        }
      },
      {
        label: "Bus",
        inputName:"bus",
        type: "select",
        isRequired: true,
        selectData:{
          attrOptionLabel: "matricula",
          attrOptionValue: "id",
          defaultOption: "Seleccione un bus por su matricula",
          varResultName: "buses"
        }
      },
      {
        label: "Horario",
        inputName:"horario",
        type: "select",
        isRequired: true,
        selectData:{
          attrOptionLabel: "nombre_horario",
          attrOptionValue: "id",
          defaultOption: "Seleccione un horario",
          varResultName: "horarios"
        }
      },
      {
        label: "Fecha",
        inputName:"fecha",
        placeholder: "2018-10-02",
        isRequired: true,
        type: "input"
      },
    ],
  }, 

  boleta: {
    urlCrud:"boleta/",
    mainLabelPlural: "Boletas",
    mainLabelSingular: "Boleta",
    name: "boleta",
    list:{
      attrForLabel:[
        {label: "Numero de factura", index:"numero_factura"},
        {label: "Nombre de Comprador", index:"nombre_comprador"}, 
        {label: "Documento de Identidad", index:"documento_identidad"}, 
      ],
      canEdit: false,
      canDelete: false,
    },
    requiredSelectData:[
      {
        uri: "viaje/",
        varResultName:"viajes",
      }
    ],
    inputs: [
      {
        label: "Nombre Pasajero",
        inputName:"nombre_comprador",
        placeholder: "",
        isRequired: true,
        type: "input"
      },
      {
        label: "Documento de identidad",
        inputName:"documento_identidad",
        placeholder: "",
        isRequired: true,
        type: "input"
      },
      {
        label: "Numero de Factura",
        inputName:"numero_factura",
        placeholder: "",
        isRequired: true,
        type: "input"
      },
      {
        label: "Viaje",
        inputName:"viaje",
        type: "select",
        isRequired: true,
        selectData:{
          attrOptionLabel: "nombre_viaje",
          attrOptionValue: "id",
          defaultOption: "Seleccione un viaje",
          varResultName: "viajes"
        }
      },
    ],
  }, 


  publicacion: {
    urlCrud:"publicacion/",
    mainLabelPlural: "Publicaciones",
    mainLabelSingular: "Publicacion",
    name: "publicacion",
    list:{
      attrForLabel:[
        {label: "Fecha", index:"fecha"},
        {label: "Puestos disponibles", index:"puestos_disponibles"},
      ],
      canEdit: false,
      canDelete: false,
    },
    requiredSelectData:[
      {
        uri: "viaje/",
        varResultName:"viajes",
      },
      {
        uri: "horario/",
        varResultName:"horarios",
      }
    ],
    inputs: [
      {
        label: "Nombre de publicacion del viaje",
        inputName:"nombre_publicacion",
        placeholder: "",
        isRequired: true,
        type: "input"
      },      
      {
        label: "Tipo de Viaje",
        inputName:"viaje",
        type: "select",
        isRequired: true,
        selectData:{
          attrOptionLabel: "nombre_viaje",
          attrOptionValue: "id",
          defaultOption: "Seleccione un viaje",

          varResultName: "viajes"
        },
      },
      {
        label: "Fecha",
        inputName:"fecha",
        placeholder: "2018-10-02",
        isRequired: true,
        type: "input"
      },
      {
        label: "Horario",
        inputName:"horario",
        type: "select",
        isRequired: true,
        selectData:{
          attrOptionLabel: "nombre_horario",
          attrOptionValue: "id",
          defaultOption: "Seleccione un horario",
          varResultName: "horarios"
        }
      }
    ],
  }, 

  estadistica: {
    urlCrud:"viaje/?capacidad_vendida=60",
    mainLabelPlural: "Viajes mas vendidos (>60%)",
    mainLabelSingular: "Viajes mas vendidos (>60%)",
    name: "viaje",
    list:{
      attrForLabel:[
        {label:"Nombre de Viaje", index:"nombre_viaje"}, 
        {label:"Puestos disponibles", index:"puestos_disponibles"},
        {label:"Bus", index:"matricula", }
      ],
      canEdit: false,
      canDelete: false,
    },
  }
}
