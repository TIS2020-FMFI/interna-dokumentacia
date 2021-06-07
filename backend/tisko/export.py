import sys, json, xlsxwriter

superior_id = input()
format_export = input()

try:
    id0 = int(superior_id)
    ###
    workbook = xlsxwriter.Workbook('exports/' + superior_id + '.xlsx')
    worksheet1 = workbook.add_worksheet()

    border_black = workbook.add_format({'bg_color':'black'})
    border_orange = workbook.add_format({'bg_color':'#ffc000'})

    skillmatrix_nazov = workbook.add_format({'bold': True, 'font_color':'#ffc000', 'bg_color':'#16365c', 'text_wrap': True, 'align':'center', 'valign':'vcenter', 'border':1})
    role_format = workbook.add_format({'bold': True, 'font_color':'#e89b54', 'bg_color':'#faf5c2', 'text_wrap': True, 'align':'center', 'valign':'vcenter', 'border':1})
    doctype_format = workbook.add_format({'bold': True, 'italic': True, 'bg_color':'#ffc000', 'align':'center', 'valign':'vcenter'})
    percentage_format = workbook.add_format({'bold': True, 'italic': True, 'bg_color':'#ffc000', 'align':'center', 'valign':'vcenter', 'border':1})
    signed = workbook.add_format({'bg_color': '#00ff00', 'align':'center', 'valign':'vcenter', 'border':1})
    unsigned = workbook.add_format({'bg_color': '#ff0000', 'align':'center', 'valign':'vcenter', 'border':1})
    not_applicable = workbook.add_format({'pattern':3, 'bg_color':'black', 'fg_color':'orange', 'border':1})
    doc_num = workbook.add_format({'bg_color':'#faf5c2', 'align':'center', 'font_color':'#6662ff', 'underline':True, 'border':1})
    doc_name = workbook.add_format({'align':'center', 'font_color':'#6662ff', 'underline':True, 'border':1})
    #-------------------------------------------------------------------------------------------------------------------------------------------

    def loadJsonFile(filename):
        parsed_file = None
        with open(filename, 'r') as json_file:
            parsed_file = json.loads(json_file.read())
        return parsed_file

    def createHeaders(workbook, worksheet, length, width):
        #background
        worksheet.set_column(1, 1, 0.3)
        worksheet.set_column(length, length, 0.3)
        worksheet.set_column(2, 2, 2)
        worksheet.set_column(length-1, length-1, 2)
        worksheet.set_row(1, 3)
        worksheet.set_row(width, 3)
        worksheet.set_row(2, 13)
        worksheet.set_row(width-1, 13)
        worksheet.set_row(3, 70)
        for x in range(1, width+1):
            for y in range(1, length+1):
                worksheet.write(x,y, '', border_black)
        for x in range(2, width):
            for y in range(2, length):
                worksheet.write(x,y, '', border_orange)
        worksheet.merge_range(3, 3, 3, 4, '                                                                        SKILL MATRIX', skillmatrix_nazov)
        worksheet.insert_image('D4', 'logo.png')
        worksheet.set_row(4, 50)
        worksheet.set_column(3, 4, 30)
        worksheet.merge_range(4, 3, 5, 3, 'OZNAČENIE\nDOKUMENTU', skillmatrix_nazov)
        worksheet.merge_range(4, 4, 5, 4, 'NÁZOV\nDOKUMENTU', skillmatrix_nazov)
        worksheet.freeze_panes(0, 5)
        #background


    def getEmployees(json_data):
        result = []
        for doc_type in json_data.keys():
            for item in json_data[doc_type]:
                for signature in item['signatures']:
                    pom = [signature['employee']['id'], signature['employee']['first_name'], signature['employee']['last_name'],
                           signature['employee']['job_title'], 0]
                    result.append(pom)
        return [list(x) for x in set(tuple(x) for x in result)]

    def exportxlsx(filename):
        export_data = loadJsonFile(filename)
        employee_list = getEmployees(export_data)
        createHeaders(workbook, worksheet1, 6+len(employee_list), 9+len(export_data['documents'])+len(export_data['online_trainings']))
        col = 5
        for item in employee_list:
            worksheet1.write(3, col, item[3], role_format)
            worksheet1.set_column(col, col, 30)
            worksheet1.write(4, col, item[1]+'\n'+item[2], skillmatrix_nazov)
            col += 1
        for i in range(0, len(employee_list)):
            #toto prepisat ako podiel vsetkych dokumentov a podpisanych
            worksheet1.write(5, 5+i, "%", percentage_format)
            ######
        worksheet1.write(6, 4, "DOKUMENTY", doctype_format)
        #7,5 zacinaju podpisy, 7,3 su dokumenty
        main_col = 3
        main_row = 7
        #DOCS
        for item in export_data['documents']:
            worksheet1.write_url(main_row, main_col, 'https://' + item['link'], doc_num, string=str(item['id']))
            main_col += 1
            worksheet1.write_url(main_row, main_col, 'https://' + item['link'],doc_name, string=item['name'])
            main_col += 1
            for employee in employee_list:
                worksheet1.write(main_row, main_col, 'o', unsigned)
                if employee[0] in [signature['employee_id'] for signature in item['signatures']]:
                    for sigs in item['signatures']:
                        if sigs['employee_id'] == employee[0]:
                            if sigs['cancel'] == True:
                                worksheet1.write(main_row, main_col, '', not_applicable)
                            else:
                                worksheet1.write(main_row, main_col, 'x', signed)
                    #TU SOM SKONCIL, DOKONCIT
                main_col += 1

            main_row += 1
            main_col = 3
        worksheet1.write(main_row, 4, "ONLINE TRAININGS", doctype_format)
        main_row += 1
        #TRAININGS
        for item in export_data['online_trainings']:
            worksheet1.write_url(main_row, main_col, 'https://' + item['link'], doc_num, string=str(item['id']))
            main_col += 1
            worksheet1.write_url(main_row, main_col, 'https://' + item['link'],doc_name, string=item['name'])
            main_col += 1
            for employee in employee_list:
                worksheet1.write(main_row, main_col, 'o', unsigned)
                if employee[0] in [signature['employee_id'] for signature in item['signatures']]:
                    for sigs in item['signatures']:
                        if sigs['employee_id'] == employee[0]:
                            if sigs['cancel'] == True:
                                worksheet1.write(main_row, main_col, '', not_applicable)
                            else:
                                worksheet1.write(main_row, main_col, 'x', signed)

    def test_output(filename):
        export_data = loadJsonFile(filename)

    if format_export != 'csv' and format_export != 'xlsx':
        raise ValueError('zly format ' + format_export)
    exportxlsx('imports/json/' + superior_id + '.json')
    workbook.close()
    ###
    print(superior_id + '.xlsx')
except Exception as error:
    print(error, file=sys.stderr)
