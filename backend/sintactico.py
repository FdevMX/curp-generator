import ply.yacc as yacc
from lexico import tokens, lexer

errors = []

# Lista de palabras inconvenientes y sus sustituciones
palabras_inconvenientes = {
    "BUEI": "BUEX", "CACA": "CACX", "CAGA": "CAGX", "CAKA": "CAKX", "COGE": "COGX",
    "COJE": "COJX", "COJO": "COJX", "FETO": "FETX", "JOTO": "JOTX", "KACO": "KACX",
    "KAGO": "KAGX", "KOJO": "KOJX", "KULO": "KULX", "MAMO": "MAMX", "MEAS": "MEAX",
    "MION": "MIOX", "MULA": "MULX", "PEDO": "PEDX", "PUTA": "PUTX", "QULO": "QULX",
    "RUIN": "RUIX", "BUEY": "BUEX", "CACO": "CACX", "CAGO": "CAGX", "CAKO": "CAKX",
    "COJA": "COJX", "COJI": "COJX", "CULO": "CULX", "GUEY": "GUEX", "KACA": "KACX",
    "KAGA": "KAGX", "KOGE": "KOGX", "KAKA": "KAKX", "MAME": "MAMX", "MEAR": "MEAX",
    "MEON": "MEOX", "MOCO": "MOCX", "PEDA": "PEDX", "PENE": "PENX", "PUTO": "PUTX",
    "RATA": "RATX"
}

# Claves de las entidades federativas
entidades = {
    "Aguascalientes": "AS", "Baja California": "BC", "Baja California Sur": "BS", "Campeche": "CC",
    "Coahuila": "CL", "Colima": "CM", "Chiapas": "CS", "Chihuahua": "CH", "Ciudad de México": "DF",
    "Durango": "DG", "Guanajuato": "GT", "Guerrero": "GR", "Hidalgo": "HG", "Jalisco": "JC",
    "México": "MC", "Michoacán": "MN", "Morelos": "MS", "Nayarit": "NT", "Nuevo León": "NL",
    "Oaxaca": "OC", "Puebla": "PL", "Querétaro": "QT", "Quintana Roo": "QR", "San Luis Potosí": "SP",
    "Sinaloa": "SL", "Sonora": "SR", "Tabasco": "TC", "Tamaulipas": "TS", "Tlaxcala": "TL",
    "Veracruz": "VZ", "Yucatán": "YN", "Zacatecas": "ZS"
}

def p_curp(p):
    '''curp : nombre apellido_paterno apellido_materno dia mes anio sexo entidad'''
    if not errors:
        curp = generar_curp(p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8])
        print(f"CURP generada: {curp}")

def p_nombre(p):
    '''nombre : NOMBRE VALOR'''
    p[0] = p[2]

def p_apellido_paterno(p):
    '''apellido_paterno : APELLIDO_PATERNO VALOR'''
    p[0] = p[2]

def p_apellido_materno(p):
    '''apellido_materno : APELLIDO_MATERNO VALOR'''
    p[0] = p[2]

def p_dia(p):
    '''dia : DIA VALOR'''
    p[0] = f"{int(p[2]):02d}"

def p_mes(p):
    '''mes : MES VALOR'''
    p[0] = f"{int(p[2]):02d}"

def p_anio(p):
    '''anio : ANIO VALOR'''
    p[0] = f"{int(p[2]):04d}"

def p_sexo(p):
    '''sexo : SEXO VALOR'''
    p[0] = p[2]

def p_entidad(p):
    '''entidad : ENTIDAD VALOR'''
    p[0] = p[2]

def p_error(p):
    if p:
        errors.append(f"Error de sintaxis en la línea {p.lineno}, posición {p.lexpos}: Token inesperado '{p.value}'")
        parser.errok()
    else:
        errors.append("Error de sintaxis: Entrada incompleta")

def generar_curp(nombre, apellido_paterno, apellido_materno, dia, mes, anio, sexo, entidad):
    # Generar los primeros cuatro caracteres de la CURP
    curp = ""
    curp += apellido_paterno[0].upper()  # Primera letra del apellido paterno
    curp += primera_vocal(apellido_paterno).upper()  # Primera vocal del apellido paterno
    curp += apellido_materno[0].upper()  # Primera letra del apellido materno
    curp += primera_letra_nombre(nombre).upper()  # Primera letra del nombre

    # Verificar y corregir palabras altisonantes
    if curp in palabras_inconvenientes:
        curp = palabras_inconvenientes[curp]

    # Continuar con la generación de la CURP
    curp += anio[2:4]  # Últimos dos dígitos del año de nacimiento
    curp += mes  # Mes de nacimiento
    curp += dia  # Día de nacimiento
    curp += sexo.upper()  # Sexo
    curp += entidades[entidad]  # Entidad federativa

    # Añadir las siguientes consonantes
    curp += siguiente_consonante(apellido_paterno).upper()  # Siguiente consonante del apellido paterno
    curp += siguiente_consonante(apellido_materno).upper()  # Siguiente consonante del apellido materno
    curp += siguiente_consonante(nombre).upper()  # Siguiente consonante del nombre

    # Añadir la homoclave
    curp += "XX"  # Homoclave (marcada con asteriscos)
    return curp

def primera_vocal(palabra):
    for letra in palabra[1:]:
        if letra.lower() in 'aeiou':
            return letra
    return 'X'  # En caso de no encontrar vocal

def primera_letra_nombre(nombre):
    nombres = nombre.split()
    if nombres[0].upper() in ['MARIA', 'JOSE'] and len(nombres) > 1:
        return nombres[1][0]
    return nombres[0][0]

def siguiente_consonante(palabra):
    for letra in palabra[1:]:
        if letra.lower() in 'bcdfghjklmnpqrstvwxyz':
            return letra
    return 'X'  # En caso de no encontrar consonante

parser = yacc.yacc()

def parse_input(code):
    global errors
    errors = []
    lexer.lineno = 1
    result = parser.parse(code, lexer=lexer)
    return errors