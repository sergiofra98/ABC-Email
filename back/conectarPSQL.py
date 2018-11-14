from configparser import ConfigParser

# Metodo config_con: regresa los parametros para la conexion con la base de datos
def config_con(filename , section):
	# Se crea un analizador sintactico 'parser'
	parser = ConfigParser()
	#Lectura del archivo 'filename'
	parser.read(filename) 
	print(parser.sections())
	# Obtener la seccion 'parametros_conexion' en el archivo 'filename=fichero.ini'       
	parametros_db = {}
	if parser.has_section(section):
		parametros = parser.items(section)
		for parametro in parametros:
			parametros_db[parametro[0]] = parametro[1]
	else:
		raise Exception('Section {0} not found in the {1} file'.format(section, filename)) 
	return parametros_db

# Metodo config_datos: regresa los datos requeridos para el envio de email	
def config_datos(filename='fichero.ini', section='datos_correo'):
	# Se crea un analizador sintactico 'parser'
	parser = ConfigParser()
	#Lectura del archivo 'filename'
	parser.read(filename)
	# Obtener la seccion 'datos_correo' en el archivo 'filename=fichero.ini'
	datos_correo = {}
	if parser.has_section(section):
		datos = parser.items(section)
		for dato in datos:
			datos_correo[dato[0]] = dato[1]
	else:
		raise Exception('Section {0} not found in the {1} file'.format(section, filename))
	return datos_correo
