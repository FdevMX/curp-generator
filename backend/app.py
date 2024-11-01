from flask import Flask, request, jsonify
from flask_cors import CORS
from lexico import get_all_tokens
from sintactico import parse_input, generar_curp

app = Flask(__name__)
CORS(app)  # Permite CORS para todas las rutas

@app.route('/analyze', methods=['POST'])
def analyze():
    code = request.json['code']
    
    # Análisis léxico
    tokens = get_all_tokens(code)
    token_list = [
        {
            "token": t[0],
            "lexeme": str(t[1]),
            "line": t[2]
        }
        for t in tokens
    ]
    
    # Análisis sintáctico
    syntax_errors = parse_input(code)
    
    # Generar CURP
    if not syntax_errors:
        nombre = request.json['nombre']
        apellido_paterno = request.json['apellido_paterno']
        apellido_materno = request.json['apellido_materno']
        dia = request.json['dia']
        mes = request.json['mes']
        anio = request.json['anio']
        sexo = request.json['sexo']
        entidad = request.json['entidad']
        curp = generar_curp(nombre, apellido_paterno, apellido_materno, dia, mes, anio, sexo, entidad)
    else:
        curp = None
    
    return jsonify({
        "tokens": token_list,
        "errors": syntax_errors,
        "curp": curp
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')