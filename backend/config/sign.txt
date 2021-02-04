update document_signatures
set e_date=now()
where id = ?
returning 'accept';