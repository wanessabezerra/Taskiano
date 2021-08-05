from django.urls import path
from django.urls import path, include  # new
from task import views
from django.urls import path, include
from django.contrib import admin
from django.views.generic.base import TemplateView


from .views import SignUpView

urlpatterns = [
    path('', views.index, name='index'),
    path('cadastrar_tarefa', views.cadastrar_tarefa, name='cadastrar_tarefa'),
    path('detalhar_tarefa/<int:pk>/',
         views.TarefaDetailView.as_view(), name='detalhar_tarefa'),
    path('cadastrar_link', views.cadastrar_link, name='cadastrar_link'),
    path('cadastrar_tag', views.cadastrar_tag, name='cadastrar_tag'),
    path('pesquisar_tarefas', views.buscar_tarefas, name='buscar_tarefas'),
    path('cadastrar_execucao', views.cadastrar_execucao, name='cadastrar_execucao'),
    path('accounts/', include('django.contrib.auth.urls')),  # new
    # path('accounts/', include('accounts.urls')), # new
    path('signup/', SignUpView.as_view(), name='signup'),
    # path('', TemplateView.as_view(template_name='home.html'), name='home'), # new
]
