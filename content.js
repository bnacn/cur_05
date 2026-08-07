/* ==========================================================================
   content.js
   Fuente única de contenido textual del portal, extraído y organizado desde
   "Documento de contenido - Portal SGCN". No se agregan conceptos nuevos:
   solo se estructuran los mismos textos para su uso interactivo.
   ========================================================================== */

const CONTENT = {

  meta: {
    title: "SGCN · Continuidad del Negocio",
    org: "Banco de la Nación Argentina",
    subtitle: "Portal interactivo de concientización sobre el Sistema de Gestión de Continuidad del Negocio",
    duration: "20 a 30 minutos"
  },

  modules: [
    {
      id: 1,
      eyebrow: "Módulo 1",
      title: "Introducción a la Continuidad del Negocio",
      icon: "compass",
      steps: [
        {
          id: "1-1",
          type: "story",
          navLabel: "¿Qué es la Continuidad del Negocio?",
          title: "¿Qué es la Continuidad del Negocio?",
          method: "M1 · Historia ilustrada",
          beats: [
            {
              label: "Situación inicial", icon: "power",
              text: "Imaginá que estás trabajando desde tu casa y, de repente, se corta la electricidad en todo el barrio. No sabés cuánto va a durar el corte. La computadora se apaga, el router deja de funcionar y varias de las tareas que estabas realizando quedan interrumpidas."
            },
            {
              label: null,
              text: "Aunque no podés solucionar el problema, enseguida empezás a buscar alternativas: usar la batería de la notebook, compartir Internet desde el celular o trasladarte a otro lugar para continuar trabajando. El objetivo ya no es resolver el corte, sino encontrar la manera de seguir adelante."
            },
            {
              label: "El problema", icon: "alert",
              text: "Los imprevistos forman parte de la vida cotidiana. Un corte de energía, una inundación o una falla tecnológica pueden interrumpir nuestras actividades en cualquier momento."
            },
            {
              label: null,
              text: "Lo importante no es evitar que ocurran, sino estar preparados para responder."
            },
            {
              label: "La conexión con el concepto", icon: "link",
              text: "Las organizaciones enfrentan el mismo desafío, pero a mayor escala. Cuando una situación inesperada afecta su funcionamiento, muchas de sus actividades no pueden simplemente detenerse hasta que el problema se resuelva."
            },
            {
              label: null,
              text: "La Continuidad del Negocio es la disciplina que prepara a una organización para mantener o recuperar sus actividades más importantes frente a una disrupción, minimizando su impacto."
            },
            {
              label: null,
              text: "Su objetivo no es reparar la causa del problema, sino asegurar que la organización pueda seguir operando o recuperarse en los tiempos que necesita."
            },
            {
              label: "Cierre", icon: "flag",
              text: "La Continuidad del Negocio puede resumirse en una idea muy sencilla: prepararse antes de una disrupción para poder seguir adelante cuando ésta ocurra."
            },
            {
              label: null,
              text: "A lo largo de este recorrido veremos cómo esa idea se transforma en un sistema de gestión y qué rol cumple cada área para hacerla posible."
            }
          ]
        },
        {
          id: "1-2",
          type: "flipcards",
          navLabel: "Objetivos de la disciplina",
          title: "Objetivos de la disciplina",
          method: "M2 · Tarjetas",
          instructions: "Tocá cada tarjeta para descubrir el concepto.",
          cards: [
            {
              title: "Continuidad",
              front: "La continuidad operativa como objetivo.",
              back: "La disciplina busca que una organización pueda mantener o recuperar sus actividades más importantes cuando una situación inesperada interrumpe su funcionamiento.",
              key: "Prepararse permite una mejor respuesta."
            },
            {
              title: "Disrupción",
              front: "Una interrupción afecta mucho más que a la tecnología.",
              back: "Las disrupciones pueden impactar en proveedores, procesos, información, instalaciones, entre otros. La Continuidad del Negocio busca reducir ese impacto para que la organización pueda seguir cumpliendo su propósito.",
              key: "La continuidad vela por aquello que permite el funcionamiento de la organización."
            },
            {
              title: "Preparación",
              front: "Improvisar rara vez es la mejor estrategia.",
              back: "Anticipar escenarios, analizar riesgos y definir cómo actuar permite responder con mayor rapidez y orden cuando ocurre una disrupción.",
              key: "La preparación reduce la incertidumbre."
            },
            {
              title: "Mejora continua",
              front: "Prepararse no es una tarea de una sola vez.",
              back: "Las organizaciones, tecnologías y contextos cambian constantemente. Por eso, las estrategias y los planes deben revisarse, actualizarse y ponerse a prueba para seguir siendo útiles frente a nuevos escenarios.",
              key: "La continuidad es un proceso de mejora permanente."
            }
          ]
        }
      ]
    },

    {
      id: 2,
      eyebrow: "Módulo 2",
      title: "Sistema de Gestión de Continuidad del Negocio",
      icon: "layers",
      scrollGroup: true,
      steps: [
        {
          id: "2-1",
          type: "intro-text",
          navLabel: "¿Qué es un Sistema de Gestión?",
          title: "¿Qué es un Sistema de Gestión?",
          paragraphs: [
            "Un Sistema de Gestión es una forma organizada de trabajar. Agrupa políticas, procesos, responsabilidades y herramientas para que un objetivo no dependa de esfuerzos aislados o la improvisación de una persona, sino de un método compartido por toda la organización.",
            "El SGCN es, entonces, el conjunto ordenado de componentes que permite al Banco anticiparse, responder y recuperarse ante situaciones que interrumpen su funcionamiento habitual. Cada uno de esos componentes cumple un rol distinto, y a la vez todos están conectados entre sí: el resultado de uno alimenta al siguiente."
          ]
        },
        {
          id: "2-2",
          type: "explorer",
          navLabel: "Componentes del Sistema",
          title: "¿Cómo funciona el Sistema de Gestión de Continuidad del Negocio?",
          method: "M8 · Exploración interactiva",
          intro: "La Continuidad del Negocio no depende de una única actividad ni de un único documento. Se basa en un Sistema de Gestión, donde distintos componentes trabajan de manera integrada y se retroalimentan de forma continua. Cada componente cumple un propósito específico, pero todos son necesarios para que el sistema funcione. Explorá cada uno para conocer su función.",
          components: [
            {
              name: "BIA",
              full: "Análisis de Impacto al Negocio",
              objective: "Comprender cuáles productos, procesos y actividades deben recuperarse primero frente a una disrupción y el período de tiempo comprometido.",
              explanation: "El BIA es el punto de partida del sistema. Permite identificar prioridades de recuperación, tiempos objetivos y recursos necesarios para hacerlo.",
              relation: "Los resultados del BIA sirven de base para definir estrategias y elaborar los planes de continuidad."
            },
            {
              name: "Estrategias",
              full: null,
              objective: "Definir cómo continuará o se recuperará una actividad frente a una disrupción.",
              explanation: "Una vez conocido el impacto de una interrupción, se evalúan distintas alternativas para responder. Las estrategias establecen el enfoque general que seguirá la organización para mantener o recuperar sus actividades.",
              relation: "Las estrategias orientan la elaboración de los planes."
            },
            {
              name: "Planes",
              full: null,
              objective: "Documentar cómo debe actuar cada área ante una disrupción.",
              explanation: "Los planes describen las acciones, responsabilidades y recursos necesarios para implementar las estrategias definidas. No existe un único plan de continuidad: cada área desarrolla los planes que le corresponden según sus actividades.",
              relation: "Los planes permiten llevar las estrategias a la práctica."
            },
            {
              name: "Capacitación",
              full: null,
              objective: "Fortalecer el conocimiento de los colaboradores sobre sus planes para conocer cuándo y cómo actuar frente a determinados escenarios.",
              explanation: "Un plan solo resulta útil si quienes pueden aplicarlo cuentan con el conocimiento relacionado. La activación y mantenimiento de cada plan depende de cada equipo, por lo que la capacitación resulta clave.",
              relation: "Prepara a las personas para ejecutar correctamente los planes."
            },
            {
              name: "Pruebas",
              full: null,
              objective: "Verificar que los planes puedan aplicarse en la práctica.",
              explanation: "Las pruebas permiten comprobar si los procedimientos definidos son viables, si los tiempos previstos pueden cumplirse y si existen oportunidades de mejora.",
              relation: "Los resultados obtenidos alimentan la mejora continua."
            },
            {
              name: "Mejora continua",
              full: null,
              objective: "Mantener actualizado el Sistema de Gestión.",
              explanation: "Las organizaciones cambian constantemente. Por eso, los resultados de las pruebas, las experiencias obtenidas y los cambios en el entorno permiten revisar y actualizar el sistema para que siga siendo eficaz.",
              relation: "La mejora continua impulsa nuevas revisiones, nuevos análisis y mantiene vigente todo el ciclo."
            }
          ],
          closing: "El Sistema de Gestión de Continuidad del Negocio funciona como un ciclo. Cada componente aporta información o resultados que sirven de base para el siguiente, permitiendo que el sistema evolucione y se mantenga actualizado frente a los cambios de la organización y su entorno."
        },
        {
          id: "2-3",
          type: "matching",
          navLabel: "Relación entre los componentes",
          title: "Relación entre los componentes",
          method: "M3 · Relacionar conceptos",
          instructions: "El Sistema de Gestión de Continuidad del Negocio está compuesto por distintos elementos que trabajan de forma integrada. Relacioná cada componente con la afirmación que mejor describa su función.",
          warning: "No todas las afirmaciones corresponden a un componente del SGCN. Algunas representan conceptos erróneos frecuentes. Identificá únicamente aquellas que describen correctamente el propósito de cada componente.",
          listA: ["BIA", "Estrategias", "Planes", "Capacitación y Concientización", "Pruebas y Ejercicios", "Mejora continua"],
          listB: [
            { letter: "A", text: "Define qué actividades son prioritarias y cuáles son sus tiempos objetivo de recuperación." },
            { letter: "B", text: "Establece la forma general en que la organización responderá ante una disrupción." },
            { letter: "C", text: "Documenta las acciones concretas que deberán ejecutar las áreas." },
            { letter: "D", text: "Prepara a las personas para que conozcan sus responsabilidades." },
            { letter: "E", text: "Permite comprobar si lo planificado funciona en la práctica." },
            { letter: "F", text: "Utiliza los resultados obtenidos para actualizar el sistema." },
            { letter: "G", text: "Coordina la resolución técnica de los incidentes." },
            { letter: "H", text: "Activa automáticamente el Comité de Crisis cuando se supera un RTO." },
            { letter: "I", text: "Ejecuta las tareas operativas durante la contingencia." },
            { letter: "J", text: "Define qué servicios debe prestar la organización." }
          ],
          pairs: [
            {
              component: "BIA", letter: "A",
              correct: "El BIA identifica las actividades prioritarias, evalúa el impacto que tendría su interrupción y permite definir objetivos temporales como el RTO o el MTPD. Esta información constituye la base para el resto del Sistema de Gestión.",
              incorrect: "El BIA no define cómo responder ni documenta procedimientos. Su propósito es comprender el impacto de una interrupción y generar la información necesaria para tomar decisiones."
            },
            {
              component: "Estrategias", letter: "B",
              correct: "Las estrategias establecen el enfoque general que seguirá la organización para mantener o recuperar sus actividades frente a una disrupción.",
              incorrect: "Las estrategias no describen el paso a paso de las tareas. Ese nivel de detalle corresponde a los planes."
            },
            {
              component: "Planes", letter: "C",
              correct: "Los planes documentan las acciones, responsabilidades y recursos necesarios para implementar la estrategia definida.",
              incorrect: "Los planes no determinan la estrategia; la llevan a la práctica mediante procedimientos concretos."
            },
            {
              component: "Capacitación y Concientización", letter: "D",
              correct: "La capacitación y la concientización preparan a las personas para comprender sus responsabilidades y actuar cuando sea necesario.",
              incorrect: "Contar con planes no es suficiente. Las personas deben conocerlos y comprender cuál es su rol para poder aplicarlos correctamente."
            },
            {
              component: "Pruebas y Ejercicios", letter: "E",
              correct: "Las pruebas permiten comprobar si las estrategias y los planes pueden ejecutarse en la práctica e identificar oportunidades de mejora.",
              incorrect: "Las pruebas no buscan evaluar a las personas, sino validar el funcionamiento del Sistema de Gestión y obtener aprendizajes."
            },
            {
              component: "Mejora continua", letter: "F",
              correct: "La mejora continua incorpora los resultados obtenidos para mantener actualizado y fortalecer el Sistema de Gestión.",
              incorrect: "La mejora continua no constituye una actividad aislada. Utiliza la experiencia obtenida para revisar y perfeccionar el resto de los componentes del sistema."
            }
          ],
          distractors: {
            G: "La resolución técnica de un incidente es responsabilidad de las áreas que gestionan ese servicio. El SGCN prepara a la organización para responder ante una disrupción, pero no administra los incidentes.",
            H: "La activación del Comité de Crisis depende del análisis institucional de la situación y no únicamente de un parámetro como el RTO o el MTPD. Este concepto se desarrollará con mayor profundidad en el apartado Gestión de Crisis.",
            I: "El Sistema de Gestión prepara a la organización para responder, pero la ejecución de las acciones corresponde a las áreas responsables, siguiendo las estrategias y los planes definidos.",
            J: "El SGCN no determina qué productos o servicios brinda una organización. Su función es prepararla para mantener o recuperar aquellos que ya forman parte de su actividad."
          },
          closing: "Cada componente cumple un propósito específico y aporta información o capacidades al siguiente. Juntos conforman un Sistema de Gestión, donde los resultados de un componente sirven de base para el siguiente y permiten mantener un proceso de mejora continua."
        }
      ]
    },

    {
      id: 3,
      eyebrow: "Módulo 3",
      title: "Incidente, disrupción y crisis",
      icon: "layers-split",
      scrollGroup: true,
      steps: [
        {
          id: "3-1",
          type: "comparison-table",
          navLabel: "Cuadro comparativo",
          title: "Relación entre incidente, disrupción y crisis",
          rows: [
            {
              question: "¿Qué caracteriza al evento?",
              incidente: "Afecta un recurso o activo puntual.",
              disrupcion: "Afecta la continuidad de una o más actividades.",
              crisis: "Requiere una respuesta institucional excepcional."
            },
            {
              question: "¿Qué se gestiona?",
              incidente: "El recurso afectado.",
              disrupcion: "La continuidad de la operación.",
              crisis: "La conducción y coordinación institucional."
            },
            {
              question: "¿Quién interviene principalmente?",
              incidente: "El área que brinda soporte sobre el recurso.",
              disrupcion: "Las áreas responsables de las actividades afectadas, aplicando las estrategias y planes definidos.",
              crisis: "La conducción institucional, mediante los mecanismos previstos para la gestión de crisis."
            },
            {
              question: "¿Puede relacionarse con los otros conceptos?",
              incidente: "Puede escalar y transformarse en una disrupción.",
              disrupcion: "Puede originarse por uno o varios incidentes o por causas externas. En algunos casos puede derivar en una crisis.",
              crisis: "Puede originarse por una disrupción, pero también por eventos reputacionales, legales, de seguridad u otras situaciones que requieran una respuesta institucional."
            }
          ]
        },
        {
          id: "3-2",
          type: "classification",
          navLabel: "Actividad de clasificación",
          title: "¿Incidente, disrupción o crisis?",
          instructions: "Leé cada situación y seleccioná la opción que mejor la represente desde la perspectiva de la Continuidad del Negocio.",
          warning: "Un mismo evento puede reunir características de más de un concepto. Sin embargo, para este ejercicio seleccioná únicamente la opción que describa mejor la situación planteada.",
          options: ["Incidente", "Disrupción", "Crisis"],
          cases: [
            {
              text: "Una impresora deja de funcionar durante la mañana en una sucursal. El resto de las operaciones continúa normalmente.",
              correct: "Incidente",
              correctFeedback: "Se trata de un problema puntual que afecta un recurso específico. Su gestión corresponde al área responsable y no compromete la continuidad de las actividades.",
              incorrectFeedback: "La opción correcta es Incidente. Aunque existe una falla, esta permanece acotada a un recurso específico y no requiere una respuesta extraordinaria ni afecta la continuidad de la operación."
            },
            {
              text: "Una falla en el sistema de autenticación impide que varias sucursales operen durante cuatro horas.",
              correct: "Disrupción",
              correctFeedback: "El evento afecta la continuidad de una actividad y requiere aplicar mecanismos previstos para recuperar la operación. En caso de no estar contemplados, debe iniciarse una cadena ascendente para que se determine la activación o no del Comité de Crisis y Continuidad del Negocio. En el apartado posterior se detalla la respuesta ante eventos disruptivos.",
              incorrectFeedback: "La opción correcta es Disrupción. El problema ya no se limita a un recurso puntual, sino que impacta sobre la disponibilidad de una actividad que puede o no involucrar a múltiples áreas."
            },
            {
              text: "Reclamos por cobros indebidos se acumulan sin resolución en varias sucursales durante varios días. Clientes afectados comparten su experiencia en redes sociales, la publicación se viraliza y genera un fuerte impacto reputacional para el Banco. La operación continúa con normalidad, pero la situación requiere decisiones institucionales coordinadas y comunicaciones oficiales.",
              correct: "Crisis",
              correctFeedback: "La crisis no depende exclusivamente de una interrupción operativa. Un problema que en principio fue puntual puede escalar y derivar en una situación reputacional que también requiere una conducción institucional.",
              incorrectFeedback: "La opción correcta es Crisis. En este caso, el elemento determinante no es la disponibilidad de los servicios, sino el impacto reputacional y la necesidad de adoptar decisiones excepcionales para gestionar la situación."
            }
          ]
        }
      ]
    },

    {
      id: 4,
      eyebrow: "Módulo 4",
      title: "Gestión de Crisis",
      icon: "shield",
      steps: [
        {
          id: "4-1",
          type: "infographic",
          navLabel: "Etapas de la gestión de un evento",
          title: "Etapas generales de la Gestión de un Evento Potencialmente Crítico",
          method: "M10 · Infografía",
          intro: [
            "Cuando ocurre un evento fuera de lo habitual, la organización debe actuar con rapidez e información incompleta. En ese momento aún puede no estar claro cuál será su alcance, cuánto tiempo durará o si será necesario adoptar medidas extraordinarias.",
            "Por ese motivo, la Gestión de Crisis comienza desde la identificación y el análisis del evento, mucho antes de que exista una eventual declaración de crisis. Su objetivo es organizar la respuesta institucional para que las decisiones se tomen de manera coordinada, con información confiable y en el momento oportuno."
          ],
          stages: [
            { n: 1, name: "Identificación", objective: "Detectar tempranamente un evento que podría requerir una respuesta institucional.", key: "Todo comienza con reconocer y reportar la situación." },
            { n: 2, name: "Comunicación", objective: "Comunicar el evento siguiendo la cadena de reporte establecida.", key: "La información debe llegar a quienes tienen la responsabilidad de evaluarla." },
            { n: 3, name: "Evaluación y activación del CCCN", objective: "Analizar el evento y determinar si corresponde activar el Comité de Crisis y Continuidad del Negocio.", key: "La activación del Comité no es automática; surge de una evaluación institucional." },
            { n: 4, name: "Análisis", objective: "Comprender el alcance, el impacto y las prioridades de respuesta.", key: "Las decisiones se apoyan en información consolidada y actualizada." },
            { n: 5, name: "Ejecución", objective: "Implementar las acciones necesarias para gestionar el evento.", key: "Se aplican las estrategias y planes definidos para reducir el impacto y sostener las funciones críticas." },
            { n: 6, name: "Cierre y mejora continua", objective: "Normalizar la situación y registrar las lecciones aprendidas.", key: "Cada evento representa una oportunidad para fortalecer el Sistema de Gestión de Continuidad del Negocio." }
          ]
        },
        {
          id: "4-2",
          type: "simulation",
          navLabel: "Simulación de decisiones",
          title: "Simulación: la tormenta",
          method: "M5 · Simulación de decisiones",
          context: [
            "Una tormenta severa afecta una zona del país donde el Banco tiene presencia. Se registran cortes de energía y dificultades de acceso en varias localidades.",
            "En algunas sucursales, el ingreso al edificio queda impedido por el agua. No es posible atender al público y todavía se desconoce cuánto tiempo durará la situación.",
            "Al mismo tiempo, otras dependencias de la zona comienzan a informar afectaciones similares."
          ],
          decisions: [
            {
              id: "d1",
              title: "Decisión 1 — Primera respuesta",
              image: "assets/dec-comunicacion.svg",
              prompt: "¿Qué debería hacerse en primer lugar?",
              type: "choice",
              options: [
                { id: "A", label: "Esperar a que la situación mejore antes de tomar una decisión." },
                { id: "B", label: "Comunicar la situación siguiendo la cadena de reporte establecida." },
                { id: "C", label: "Intentar resolver la situación únicamente con los recursos de la sucursal, sin comunicar el evento." }
              ],
              analysis: {
                A: {
                  elegiste: "Esperar a que la situación mejore antes de tomar una decisión.",
                  consecuencia: "Mientras transcurre el tiempo, el evento continúa evolucionando y otras dependencias comienzan a verse afectadas. La organización demora en contar con una visión completa de la situación.",
                  concepto: "Frente a un evento potencialmente crítico, el tiempo es un factor relevante. Comunicar oportunamente permite que quienes tienen la responsabilidad de evaluar el evento cuenten con la información necesaria para dimensionar su alcance."
                },
                B: {
                  elegiste: "Comunicar la situación siguiendo la cadena de reporte establecida.",
                  consecuencia: "La información llega rápidamente a quienes deben evaluar el alcance del evento y determinar los pasos siguientes.",
                  concepto: "La comunicación temprana facilita la evaluación institucional del evento. Comunicar no implica declarar una crisis; permite que la situación sea analizada por quienes tienen la responsabilidad de hacerlo."
                },
                C: {
                  elegiste: "Intentar resolver la situación únicamente con los recursos de la sucursal.",
                  consecuencia: "Aunque se realizan acciones locales para enfrentar el problema, la información no llega oportunamente a las instancias encargadas de evaluar el evento en su conjunto.",
                  concepto: "La resolución local y la comunicación institucional no son acciones excluyentes. Un evento puede requerir acciones inmediatas en el lugar y, al mismo tiempo, ser comunicado para permitir una evaluación más amplia."
                }
              }
            },
            {
              id: "d2",
              title: "Decisión 2 — Objetivo de recuperación",
              image: "assets/dec-rto.svg",
              prompt: "Mientras se analiza la situación, recordás que durante el BIA se definió un Tiempo Objetivo de Recuperación (RTO) para las funciones críticas de la sucursal. ¿Qué RTO elegirías para esta función?",
              type: "choice",
              options: [
                { id: "10min", label: "10 minutos" },
                { id: "1h", label: "1 hora" },
                { id: "6h", label: "6 horas" }
              ],
              analysis: {
                "10min": {
                  elegiste: "Un RTO de 10 minutos.",
                  consecuencia: "Un RTO de 10 minutos define un objetivo muy exigente: la función debería quedar recuperada casi de inmediato.",
                  concepto: "El Tiempo Objetivo de Recuperación (RTO) establece el horizonte de recuperación que cada Equipo se pone como objetivo. Cuanto menor sea el valor, más exigente es el RTO; cuanto mayor sea, mayor podrá ser el impacto potencial de la afectación."
                },
                "1h": {
                  elegiste: "Un RTO de 1 hora.",
                  consecuencia: "Un RTO de 1 hora define un objetivo intermedio, con un equilibrio entre exigencia y margen de maniobra.",
                  concepto: "El Tiempo Objetivo de Recuperación (RTO) establece el horizonte de recuperación que cada Equipo se pone como objetivo. Cuanto menor sea el valor, más exigente es el RTO; cuanto mayor sea, mayor podrá ser el impacto potencial de la afectación."
                },
                "6h": {
                  elegiste: "Un RTO de 6 horas.",
                  consecuencia: "Un RTO de 6 horas define un objetivo más laxo, con mayor margen de tiempo antes de recuperar la función.",
                  concepto: "El Tiempo Objetivo de Recuperación (RTO) establece el horizonte de recuperación que cada Equipo se pone como objetivo. Cuanto menor sea el valor, más exigente es el RTO; cuanto mayor sea, mayor podrá ser el impacto potencial de la afectación."
                }
              }
            },
            {
              id: "d3",
              title: "Decisión 3 — Estrategia de continuidad",
              image: "assets/dec-estrategia.svg",
              prompt: "Mientras el edificio continúa inaccesible, es necesario definir cómo sostener las funciones críticas de la sucursal. ¿Qué alternativa resulta más adecuada?",
              type: "choice",
              options: [
                { id: "A", label: "Esperar a que el acceso al edificio vuelva a ser posible." },
                { id: "B", label: "Aplicar la estrategia prevista, derivando la atención a canales digitales y, cuando corresponda, a sucursales cercanas." }
              ],
              analysis: {
                A: {
                  elegiste: "Esperar a que el edificio vuelva a estar disponible.",
                  consecuencia: "El edificio permanece inaccesible mientras dura la tormenta: eso no cambia según lo que se decida.",
                  concepto: "Lo que cambia con esta decisión es el impacto, no el evento. Al esperar a que el edificio vuelva a estar disponible, las funciones críticas quedan sin ninguna alternativa mientras tanto, y el impacto sobre los clientes crece cuanto más se extiende la situación."
                },
                B: {
                  elegiste: "Aplicar la estrategia prevista.",
                  consecuencia: "El edificio permanece inaccesible mientras dura la tormenta: eso no cambia según lo que se decida.",
                  concepto: "Lo que cambia con esta decisión es el impacto, no el evento. Al aplicar la estrategia prevista, las funciones críticas se sostienen mediante canales digitales y sucursales cercanas, y el impacto sobre los clientes se reduce aunque el edificio original siga inaccesible."
                }
              }
            }
          ],
          closingPoints: [
            "La comunicación permite que el evento sea evaluado oportunamente.",
            "El BIA define objetivos de recuperación acordes con las necesidades del negocio.",
            "Las estrategias de continuidad establecen cómo sostener los procesos cuando una disrupción afecta la operatoria.",
            "Los planes documentan las acciones necesarias para aplicar esas estrategias de manera organizada."
          ],
          closingText: "Cada uno de estos componentes cumple un rol específico, pero su verdadero valor aparece cuando funcionan de manera integrada frente a un evento real.",
          keyIdea: "La Continuidad del Negocio no consiste en improvisar cuando ocurre una disrupción. Consiste en prepararse con anticipación para responder de forma organizada, sosteniendo los procesos que permiten al Banco continuar brindando sus productos y servicios."
        }
      ]
    }
  ],

  final: {
    title: "¡Actividad finalizada!",
    text1: "Felicitaciones. Llegaste al final de esta actividad de concientización sobre Continuidad del Negocio.",
    text2: "A lo largo del recorrido repasaste los conceptos fundamentales de la disciplina, conociste cómo funciona el Sistema de Gestión de Continuidad del Negocio (SGCN) y analizaste diferentes situaciones para comprender la diferencia entre un incidente, una disrupción y una crisis.",
    text3: "También viste cómo el BIA, las estrategias, los planes, la capacitación y las pruebas forman parte de un mismo proceso cuyo objetivo es preparar a la organización para responder de manera planificada frente a eventos disruptivos.",
    codeLabel: "Código de finalización",
    codeInstructions: "Para registrar la realización de esta actividad, ingresá el siguiente código en el formulario desde el cual accediste al portal.",
    codeNote: "El código se genera automáticamente al finalizar el recorrido."
  }
};
