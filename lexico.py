import ply.lex as lex

# Lista de nombres de tokens
tokens = [
    'NOMBRE', 'APELLIDO_PATERNO', 'APELLIDO_MATERNO', 'DIA', 'MES', 'ANIO', 'SEXO', 'ENTIDAD', 'VALOR', 'ESPACIO'
]

# Palabras reservadas
reserved = {
    'H': 'SEXO',
    'M': 'SEXO',
    'NB': 'SEXO'
}

# Reglas para tokens simples
t_ESPACIO = r'\s+'

# Reglas para tokens más complejos
def t_NOMBRE(t):
    r'nombre:'
    return t

def t_APELLIDO_PATERNO(t):
    r'apellido_paterno:'
    return t

def t_APELLIDO_MATERNO(t):
    r'apellido_materno:'
    return t

def t_DIA(t):
    r'dia:'
    return t

def t_MES(t):
    r'mes:'
    return t

def t_ANIO(t):
    r'anio:'
    return t

def t_SEXO(t):
    r'sexo:'
    return t

def t_ENTIDAD(t):
    r'entidad:'
    return t

def t_VALOR(t):
    r'[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9]+'
    return t

# Ignorar espacios y tabulaciones
t_ignore = ' \t'

# Contador de líneas
def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

# Manejo de errores
def t_error(t):
    print(f"Carácter ilegal '{t.value[0]}' en la línea {t.lexer.lineno}")
    t.lexer.skip(1)

# Construir el lexer
lexer = lex.lex()

# Función para obtener todos los tokens
def get_all_tokens(code):
    lexer.lineno = 1
    lexer.input(code)
    tokens = []
    while True:
        tok = lexer.token()
        if not tok:
            break
        tokens.append((tok.type, tok.value, tok.lineno))
    return tokens