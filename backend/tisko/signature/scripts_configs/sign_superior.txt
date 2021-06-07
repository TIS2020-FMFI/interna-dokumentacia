update document_signatures
set s_date=now()
where id = ?
returning 'accept';