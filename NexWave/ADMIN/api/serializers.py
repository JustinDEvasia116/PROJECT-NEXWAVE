from rest_framework import serializers
from ADMIN.models import Plan, PlanCategory

class PlanCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanCategory
        fields = '__all__'

    def create(self, validated_data):
        # Perform data validation here
        # For example, check if a category with the same name already exists
        category_name = validated_data.get('name')
        if PlanCategory.objects.filter(name=category_name).exists():
            raise serializers.ValidationError("A category with this name already exists.")

        # Create and save the plan category
        plan_category = PlanCategory.objects.create(**validated_data)
        return plan_category

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ['id', 'name', 'data_limit', 'voice_limit', 'sms_limit', 'price', 'category']

    def create(self, validated_data):
        # Perform data validation here
        # For example, check if a plan with the same name already exists
        plan_name = validated_data.get('name')
        if Plan.objects.filter(name=plan_name).exists():
            raise serializers.ValidationError("A plan with this name already exists.")
        
        # Get the category and remove it from validated_data
        category = validated_data.pop('category')
        
        # Find the corresponding PlanCategory instance by its ID
        category_id = PlanCategory.objects.get(id=category.id)
        
        # Create and save the plan
        plan = Plan.objects.create(category=category_id, **validated_data)
        return plan
