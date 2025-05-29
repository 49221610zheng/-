<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// 作品数据文件路径
$worksFile = 'works.json';

// 获取请求方法
$method = $_SERVER['REQUEST_METHOD'];

// 读取作品数据
function readWorks() {
    global $worksFile;
    if (file_exists($worksFile)) {
        $content = file_get_contents($worksFile);
        return json_decode($content, true);
    }
    return ['works' => []];
}

// 保存作品数据
function saveWorks($data) {
    global $worksFile;
    file_put_contents($worksFile, json_encode($data, JSON_PRETTY_PRINT));
}

// 处理图片上传
function handleImageUpload($file, $category) {
    $targetDir = "imgs/" . $category . "/";
    
    // 创建目录（如果不存在）
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    
    // 生成唯一文件名
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = uniqid() . '.' . $extension;
    $targetFile = $targetDir . $fileName;
    
    // 移动上传的文件
    if (move_uploaded_file($file['tmp_name'], $targetFile)) {
        return $targetFile;
    }
    return false;
}

switch ($method) {
    case 'GET':
        // 获取所有作品
        $data = readWorks();
        echo json_encode($data);
        break;
        
    case 'POST':
        // 添加新作品
        if (isset($_FILES['image'])) {
            $category = $_POST['category'];
            $imagePath = handleImageUpload($_FILES['image'], $category);
            
            if ($imagePath) {
                $data = readWorks();
                $newWork = [
                    'id' => $category . '_' . time(),
                    'category' => $category,
                    'image' => $imagePath,
                    'title' => $_POST['title'],
                    'description' => $_POST['description']
                ];
                
                $data['works'][] = $newWork;
                saveWorks($data);
                
                echo json_encode(['success' => true, 'work' => $newWork]);
            } else {
                http_response_code(500);
                echo json_encode(['error' => '图片上传失败']);
            }
        } else {
            http_response_code(400);
            echo json_encode(['error' => '未提供图片文件']);
        }
        break;
        
    case 'DELETE':
        // 删除作品
        $id = $_GET['id'];
        $data = readWorks();
        
        // 查找并删除作品
        foreach ($data['works'] as $key => $work) {
            if ($work['id'] === $id) {
                // 删除图片文件
                if (file_exists($work['image'])) {
                    unlink($work['image']);
                }
                // 从数组中移除作品
                array_splice($data['works'], $key, 1);
                break;
            }
        }
        
        saveWorks($data);
        echo json_encode(['success' => true]);
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => '方法不允许']);
        break;
} 