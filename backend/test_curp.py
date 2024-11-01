from lexico import lexer, get_all_tokens
from sintactico import parse_input

# Datos de prueba
datos_prueba = """
nombre: Juan
apellido_paterno: Pérez
apellido_materno: Gómez
dia: 15
mes: 08
anio: 1990
sexo: H
entidad: DF
"""

# Función para formatear los datos de prueba en el formato esperado por el parser
def formatear_datos(datos):
    lineas = datos.strip().split('\n')
    codigo = ""
    for linea in lineas:
        codigo += f"{linea.strip()} "
    return codigo.strip()

# Formatear los datos de prueba
codigo = formatear_datos(datos_prueba)

# Obtener los tokens
tokens = get_all_tokens(codigo)
print("Tokens:")
for token in tokens:
    print(token)

# Parsear los datos
errores = parse_input(codigo)
if errores:
    print("Errores de sintaxis:")
    for error in errores:
        print(error)
else:
    print("CURP generada correctamente.")