update online_training_signatures
set date=now()
where id = ?
returning 'accept';