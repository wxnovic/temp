# config/dbrouters.py

class AppDatabaseRouter:
    """
    app_label 기준으로 DB를 라우팅하는 Router
    """

    app_label_to_db = {
        "accounts": "default",
        "level2db": "level2db",
        "legacy2": "another",
    }

    def db_for_read(self, model, **hints):
        return self.app_label_to_db.get(model._meta.app_label, "default")

    def db_for_write(self, model, **hints):
        return self.app_label_to_db.get(model._meta.app_label, "default")

    def allow_relation(self, obj1, obj2, **hints):
        """
        서로 같은 DB에 매핑된 앱끼리는 관계 허용
        """
        db1 = self.app_label_to_db.get(obj1._meta.app_label, "default")
        db2 = self.app_label_to_db.get(obj2._meta.app_label, "default")
        if db1 and db2:
            return db1 == db2
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        마이그레이션이 어느 DB에 적용될지 결정
        """
        target_db = self.app_label_to_db.get(app_label, "default")
        return db == target_db
