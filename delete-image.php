<?php
header('Content-Type: application/json');

// 设置允许的来源
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// 只允许POST请求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => '方法不允许']);
    exit;
}

// 获取图片路径
$imagePath = isset($_GET['path']) ? $_GET['path'] : '';

if (empty($imagePath)) {
    http_response_code(400);
    echo json_encode(['error' => '未提供图片路径']);
    exit;
}

// 安全检查：确保路径在imgs目录下
$realPath = realpath($imagePath);
$imgsDir = realpath('imgs');

if ($realPath === false || strpos($realPath, $imgsDir) !== 0) {
    http_response_code(403);
    echo json_encode(['error' => '无效的图片路径']);
    exit;
}

// 尝试删除文件
if (file_exists($imagePath) && unlink($imagePath)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => '删除文件失败']);
} 